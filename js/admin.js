import { supabase } from "./supabase.js";
import { requireRole, logout, $, esc, fmtDateTime, fmtDate } from "./utils.js";

let schools = [], courses = [];

function table(headers, rows) {
  return `<table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.join(""):`<tr><td colspan="${headers.length}" class="muted">Пока нет данных.</td></tr>`}</tbody></table>`;
}

async function init() {
  const auth = await requireRole("admin"); if (!auth) return;
  $("adminName").textContent = auth.profile.full_name;
  $("logout").onclick = logout;

  document.querySelectorAll(".navbtn").forEach(btn => btn.onclick = () => {
    document.querySelectorAll(".navbtn,.page").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); $(btn.dataset.page).classList.add("active");
  });

  $("openSchool").onclick = ()=>$("schoolForm").classList.remove("hidden");
  $("cancelSchool").onclick = ()=>$("schoolForm").classList.add("hidden");
  $("openTeacher").onclick = ()=>$("teacherForm").classList.remove("hidden");
  $("cancelTeacher").onclick = ()=>$("teacherForm").classList.add("hidden");

  $("schoolForm").onsubmit = createSchool;
  $("teacherForm").onsubmit = createTeacher;

  await refreshAll();
}

async function refreshAll(){
  await Promise.all([loadSchools(), loadCourses()]);
  fillSelects();
  await Promise.all([loadStats(), loadTeachers(), loadResults(), loadCertificates()]);
}

async function loadStats(){
  const q = await Promise.all([
    supabase.from("schools").select("*",{count:"exact",head:true}),
    supabase.from("profiles").select("*",{count:"exact",head:true}).eq("role","teacher"),
    supabase.from("courses").select("*",{count:"exact",head:true}),
    supabase.from("certificates").select("*",{count:"exact",head:true})
  ]);
  ["sSchools","sTeachers","sCourses","sCerts"].forEach((id,i)=>$(id).textContent=q[i].count??0);
}

async function loadSchools(){
  const {data,error}=await supabase.from("schools").select("*").order("created_at",{ascending:false});
  if(error) throw error; schools=data||[];
  $("schoolsTable").innerHTML=table(["Школа","Город","Адрес","Добавлена"],schools.map(s=>`<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.city||"—")}</td><td>${esc(s.address||"—")}</td><td>${fmtDate(s.created_at)}</td></tr>`));
}
async function createSchool(e){
  e.preventDefault();
  const {error}=await supabase.from("schools").insert({name:$("schoolName").value.trim(),city:$("schoolCity").value.trim()||null,address:$("schoolAddress").value.trim()||null});
  if(error) return alert(error.message);
  e.target.reset(); e.target.classList.add("hidden"); await loadSchools(); fillSelects(); await loadStats();
}
async function loadCourses(){
  const {data,error}=await supabase.from("courses").select("*,lessons(id)").order("created_at");
  if(error) throw error; courses=data||[];
  $("coursesTable").innerHTML=table(["Курс","Оборудование","Занятий","Статус"],courses.map(c=>`<tr><td><b>${esc(c.title)}</b></td><td>${esc(c.equipment||"—")}</td><td>${c.lessons?.length||0}</td><td><span class="badge ${c.active?"good":"off"}">${c.active?"Активен":"Отключен"}</span></td></tr>`));
}
function fillSelects(){
  $("teacherSchool").innerHTML=`<option value="">Выберите школу</option>`+schools.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");
  $("teacherCourse").innerHTML=courses.filter(c=>c.active).map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join("");
}
async function createTeacher(e){
  e.preventDefault(); $("teacherMsg").textContent="Создаем...";
  const payload={school_id:$("teacherSchool").value,full_name:$("teacherName").value.trim(),login:$("teacherLogin").value.trim(),password:$("teacherPassword").value,course_id:$("teacherCourse").value};
  const {data,error}=await supabase.functions.invoke("create-teacher",{body:payload});
  if(error){
    $("teacherMsg").textContent="Не удалось создать учителя: "+error.message;
    $("teacherFunctionWarning").classList.remove("hidden"); return;
  }
  if(data?.error){$("teacherMsg").textContent=data.error;return}
  $("teacherMsg").textContent="Учетная запись создана."; e.target.reset(); e.target.classList.add("hidden"); await loadTeachers(); await loadStats();
}
async function loadTeachers(){
  const {data,error}=await supabase.from("profiles").select("id,full_name,username,active,created_at,schools(name),teacher_courses(status,courses(title))").eq("role","teacher").order("created_at",{ascending:false});
  if(error) throw error;
  $("teachersTable").innerHTML=table(["ФИО","Школа","Логин","Курс","Статус","Действия"],(data||[]).map(t=>{
    const tc=t.teacher_courses?.[0];
    return `<tr><td><b>${esc(t.full_name)}</b></td><td>${esc(t.schools?.name||"—")}</td><td>${esc(t.username||"—")}</td><td>${esc(tc?.courses?.title||"—")}</td><td><span class="badge ${t.active?"good":"off"}">${t.active?"Активен":"Отключен"}</span></td><td><button class="btn secondary toggle" data-id="${t.id}" data-active="${t.active}">${t.active?"Отключить":"Включить"}</button></td></tr>`;
  }));
  document.querySelectorAll(".toggle").forEach(b=>b.onclick=()=>toggleTeacher(b.dataset.id,b.dataset.active==="true"));
}
async function toggleTeacher(id, active){
  const {error}=await supabase.from("profiles").update({active:!active}).eq("id",id);
  if(error) return alert(error.message); await loadTeachers();
}
async function loadResults(){
  const {data,error}=await supabase.from("test_results").select("score,created_at,teacher_id,profiles!test_results_teacher_id_fkey(full_name,schools(name)),lessons(title)").order("created_at",{ascending:false});
  if(error){$("resultsTable").innerHTML=`<div class="notice warning">${esc(error.message)}</div>`;return}
  $("resultsTable").innerHTML=table(["Учитель","Школа","Тест","Результат","Дата"],(data||[]).map(r=>`<tr><td>${esc(r.profiles?.full_name||"—")}</td><td>${esc(r.profiles?.schools?.name||"—")}</td><td>${esc(r.lessons?.title||"Итоговый тест")}</td><td><b>${r.score??"—"}%</b></td><td>${fmtDateTime(r.created_at)}</td></tr>`));
}
async function loadCertificates(){
  const {data,error}=await supabase.from("certificates").select("*,profiles!certificates_teacher_id_fkey(full_name,schools(name)),courses(title)").order("issue_date",{ascending:false});
  if(error){$("certificatesTable").innerHTML=`<div class="notice warning">${esc(error.message)}</div>`;return}
  $("certificatesTable").innerHTML=table(["№ сертификата","Учитель","Школа","Курс","Результат","Дата"],(data||[]).map(c=>`<tr><td><b>${esc(c.certificate_number)}</b></td><td>${esc(c.profiles?.full_name||"—")}</td><td>${esc(c.profiles?.schools?.name||"—")}</td><td>${esc(c.courses?.title||"—")}</td><td>${c.final_score??"—"}%</td><td>${fmtDate(c.issue_date)}</td></tr>`));
}
init().catch(e=>{console.error(e);alert("Ошибка загрузки админ-панели: "+e.message)});
