import { supabase } from "./supabase.js";
import { requireRole, logout, $, esc, fmtDateTime, fmtDate } from "./utils.js";

let schools=[], courses=[], teachers=[];
const table=(h,r)=>`<table><thead><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${r.length?r.join(""):`<tr><td colspan="${h.length}" class="muted">Пока нет данных.</td></tr>`}</tbody></table>`;

async function init(){
 const auth=await requireRole("admin"); if(!auth)return;
 if ($("adminName")) $("adminName").textContent=auth.profile.full_name; if ($("logout")) $("logout").onclick=logout;
 document.querySelectorAll(".navbtn").forEach(b=>b.onclick=()=>{document.querySelectorAll(".navbtn,.page").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.page).classList.add("active")});
 if ($("openSchool") && $("schoolForm")) $("openSchool").onclick=()=> $("schoolForm").classList.remove("hidden");
 if ($("cancelSchool") && $("schoolForm")) $("cancelSchool").onclick=()=> $("schoolForm").classList.add("hidden");
 if ($("openTeacher") && $("teacherForm")) $("openTeacher").onclick=()=> $("teacherForm").classList.remove("hidden");
 if ($("cancelTeacher") && $("teacherForm")) $("cancelTeacher").onclick=()=> $("teacherForm").classList.add("hidden");
 if ($("schoolForm")) $("schoolForm").onsubmit=createSchool;
 if ($("teacherForm")) $("teacherForm").onsubmit=createTeacher;

 // Обработчик действий внутри динамической таблицы учителей.
 if ($("teachersTable")) $("teachersTable").addEventListener("click", async (e) => {
   const addBtn = e.target.closest(".assign-direct");
   if (addBtn) {
     e.preventDefault();
     const teacherId = addBtn.dataset.id;
     const select = document.querySelector(`select.course-for-teacher[data-id="${teacherId}"]`);
     const courseId = select?.value;
     if (!courseId) {
       alert("Нет доступного курса для назначения.");
       return;
     }
     addBtn.disabled = true;
     const oldText = addBtn.textContent;
     addBtn.textContent = "Добавляем...";
     try {
       const { error } = await supabase.from("teacher_courses")
         .insert({ teacher_id: teacherId, course_id: courseId, status: "assigned" });

       if (error) {
         if (error.code === "23505") alert("Этот курс уже назначен учителю.");
         else alert("Ошибка добавления курса: " + error.message);
         return;
       }

       alert("Курс успешно добавлен к существующему аккаунту.");
       await loadTeachers();
     } finally {
       addBtn.disabled = false;
       addBtn.textContent = oldText;
     }
     return;
   }

   const toggleBtn = e.target.closest(".toggle");
   if (toggleBtn) {
     e.preventDefault();
     await toggleTeacher(toggleBtn.dataset.id, toggleBtn.dataset.active === "true");
   }
 });

 await refreshAll();
}
async function refreshAll(){await Promise.all([loadSchools(),loadCourses()]);fillSelects();await Promise.all([loadTeachers(),loadStats(),loadResults(),loadCertificates()])}
async function loadStats(){const q=await Promise.all([supabase.from("schools").select("*",{count:"exact",head:true}),supabase.from("profiles").select("*",{count:"exact",head:true}).eq("role","teacher"),supabase.from("courses").select("*",{count:"exact",head:true}),supabase.from("certificates").select("*",{count:"exact",head:true})]);["sSchools","sTeachers","sCourses","sCerts"].forEach((id,i)=>$(id).textContent=q[i].count??0)}
async function loadSchools(){const {data,error}=await supabase.from("schools").select("*").order("created_at",{ascending:false});if(error)throw error;schools=data||[];$("schoolsTable").innerHTML=table(["Школа","Город","Адрес"],schools.map(s=>`<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.city||"—")}</td><td>${esc(s.address||"—")}</td></tr>`))}
async function createSchool(e){e.preventDefault();const {error}=await supabase.from("schools").insert({name:$("schoolName").value.trim(),city:$("schoolCity").value.trim()||null,address:$("schoolAddress").value.trim()||null});if(error)return alert(error.message);e.target.reset();e.target.classList.add("hidden");await loadSchools();fillSelects();await loadStats()}
async function loadCourses(){const {data,error}=await supabase.from("courses").select("*,lessons(id)").order("created_at");if(error)throw error;courses=data||[];$("coursesTable").innerHTML=table(["Курс","Оборудование","Занятий","Статус"],courses.map(c=>`<tr><td><b>${esc(c.title)}</b></td><td>${esc(c.equipment||"—")}</td><td>${c.lessons?.length||0}</td><td><span class="badge ${c.active?"good":"off"}">${c.active?"Активен":"Отключен"}</span></td></tr>`))}
function fillSelects(){
 $("teacherSchool").innerHTML='<option value="">Выберите школу</option>'+schools.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");
 $("teacherCourse").innerHTML=courses.filter(c=>c.active).map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join("");
}
async function createTeacher(e){
 e.preventDefault();$("teacherMsg").textContent="Создаем...";
 const payload={school_id:$("teacherSchool").value,full_name:$("teacherName").value.trim(),login:$("teacherLogin").value.trim(),password:$("teacherPassword").value,course_id:$("teacherCourse").value};
 const {data,error}=await supabase.functions.invoke("create-teacher",{body:payload});
 if(error){$("teacherMsg").textContent="Ошибка: "+error.message;return}
 if(data?.error){$("teacherMsg").textContent=data.error;return}
 $("teacherMsg").textContent="Учетная запись создана.";e.target.reset();e.target.classList.add("hidden");await loadTeachers();await loadStats()
}
async function loadTeachers(){
 const {data,error}=await supabase.from("profiles")
   .select("id,full_name,username,active,schools(name),teacher_courses(id,status,course_id,courses(id,title,slug))")
   .eq("role","teacher")
   .order("created_at",{ascending:false});
 if(error)throw error;
 teachers=data||[];

 $("teachersTable").innerHTML=table(
   ["ФИО","Школа","Логин","Назначенные курсы","Добавить курс","Статус","Действия"],
   teachers.map(t=>{
     const assigned=t.teacher_courses||[];
     const assignedIds=new Set(assigned.map(x=>x.course_id));
     const available=courses.filter(c=>c.active&&!assignedIds.has(c.id));

     const coursesHtml=assigned.length
       ? assigned.map(x=>`<div style="margin:3px 0"><span class="badge ${x.status==="completed"?"good":""}">${esc(x.courses?.title||"Курс")}</span></div>`).join("")
       : "—";

     const assignHtml=available.length
       ? `<div style="display:flex;gap:8px;align-items:center;min-width:330px">
            <select class="course-for-teacher" data-id="${t.id}" style="min-width:210px">
              ${available.map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join("")}
            </select>
            <button type="button" class="btn assign-direct" data-id="${t.id}">Добавить</button>
          </div>`
       : `<span class="muted small">Все курсы уже назначены</span>`;

     return `<tr>
       <td><b>${esc(t.full_name)}</b></td>
       <td>${esc(t.schools?.name||"—")}</td>
       <td>${esc(t.username||"—")}</td>
       <td>${coursesHtml}</td>
       <td>${assignHtml}</td>
       <td><span class="badge ${t.active?"good":"off"}">${t.active?"Активен":"Отключен"}</span></td>
       <td><button type="button" class="btn secondary toggle" data-id="${t.id}" data-active="${t.active}">${t.active?"Отключить":"Включить"}</button></td>
     </tr>`;
   })
 );
}
async function toggleTeacher(id,active){const {error}=await supabase.from("profiles").update({active:!active}).eq("id",id);if(error)return alert(error.message);await loadTeachers()}
async function loadResults(){
 const {data,error}=await supabase.from("test_results").select("score,created_at,profiles!test_results_teacher_id_fkey(full_name,schools(name)),lessons(title,courses(title))").order("created_at",{ascending:false});
 if(error){$("resultsTable").innerHTML=`<div class="notice warning">${esc(error.message)}</div>`;return}
 $("resultsTable").innerHTML=table(["Учитель","Школа","Курс","Результат","Дата"],(data||[]).map(r=>`<tr><td>${esc(r.profiles?.full_name||"—")}</td><td>${esc(r.profiles?.schools?.name||"—")}</td><td>${esc(r.lessons?.courses?.title||"—")}</td><td><b>${r.score??"—"}%</b></td><td>${fmtDateTime(r.created_at)}</td></tr>`))
}
async function loadCertificates(){
 const {data,error}=await supabase.from("certificates").select("*,profiles!certificates_teacher_id_fkey(full_name,schools(name)),courses(title)").order("issue_date",{ascending:false});
 if(error){$("certificatesTable").innerHTML=`<div class="notice warning">${esc(error.message)}</div>`;return}
 $("certificatesTable").innerHTML=table(["№","Учитель","Курс","Результат","Дата"],(data||[]).map(c=>`<tr><td>${esc(c.certificate_number)}</td><td>${esc(c.profiles?.full_name||"—")}</td><td>${esc(c.courses?.title||"—")}</td><td>${c.final_score??"—"}%</td><td>${fmtDate(c.issue_date)}</td></tr>`))
}
init().catch(e=>{console.error(e);alert("Ошибка: "+e.message)});
