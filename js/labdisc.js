import { supabase } from "./supabase.js";
import { lessons } from "./labdisc-content.js";
import { requireRole, logout, $, esc } from "./utils.js";

let session, profile, course, dbLessons=[], completed=new Set(), current=0;

async function init(){
  const auth=await requireRole("teacher"); if(!auth)return;
  ({session,profile}=auth); $("logout").onclick=logout;

  const {data:c,error:ce}=await supabase.from("courses").select("id,title,slug").eq("slug","labdisc").single();
  if(ce) throw ce; course=c;
  const {data:assignment}=await supabase.from("teacher_courses").select("id,status").eq("teacher_id",session.user.id).eq("course_id",course.id).maybeSingle();
  if(!assignment){alert("Курс LabDisc не назначен вашему аккаунту.");return location.replace("teacher.html")}

  const {data:rows,error:le}=await supabase.from("lessons").select("id,title,lesson_order").eq("course_id",course.id).eq("active",true).order("lesson_order");
  if(le) throw le; dbLessons=rows||[];

  // В базе может быть 11 уроков, а в старом контенте другое количество.
  // Сопоставление идет по порядковому номеру.
  const {data:prog}=await supabase.from("lesson_progress").select("lesson_id,status").eq("teacher_id",session.user.id);
  (prog||[]).forEach(p=>{ if(p.status==="completed") completed.add(p.lesson_id) });

  const firstIncomplete=dbLessons.findIndex(l=>!completed.has(l.id));
  current = firstIncomplete>=0 ? Math.min(firstIncomplete, lessons.length-1) : Math.max(0,lessons.length-1);
  await markStarted();
  render();
}

function dbLesson(i){ return dbLessons[i] || null }
function isDone(i){ const d=dbLesson(i); return !!d && completed.has(d.id) }
function unlocked(i){ return i===0 || isDone(i) || isDone(i-1) }

function renderMenu(){
  let last="";
  $("lessonMenu").innerHTML=lessons.map((l,i)=>{
    let prefix="";
    if(l.module!==last){prefix=`<div class="module-title">${esc(l.module)}</div>`;last=l.module}
    const cls=i===current?"active":isDone(i)?"done":unlocked(i)?"":"locked";
    return `${prefix}<button class="lesson-link ${cls}" data-i="${i}" ${unlocked(i)?"":"disabled"}>${isDone(i)?"✓ ":""}${i+1}. ${esc(l.title)}</button>`;
  }).join("");
  document.querySelectorAll(".lesson-link").forEach(b=>b.onclick=async()=>{current=Number(b.dataset.i);await markStarted();render()});
}
function render(){
  const l=lessons[current];
  $("lessonModule").textContent=l.module;
  $("lessonTitle").textContent=l.title;
  $("lessonSubtitle").textContent=l.subtitle||"";
  $("lessonBody").innerHTML=l.html;
  $("prevLesson").disabled=current===0;
  $("nextLesson").disabled=current===lessons.length-1 || !isDone(current);
  $("completeLesson").textContent=isDone(current)?"Занятие пройдено ✓":"Завершить занятие";
  $("completeLesson").disabled=isDone(current);
  $("finalTestBox").innerHTML = current===lessons.length-1 && isDone(current)
    ? `<div class="card panel"><h2>Итоговый тест</h2><p class="muted">Все занятия завершены. Пройдите итоговый тест, чтобы получить сертификат.</p><a class="btn" href="labdisc-test.html">Перейти к тесту</a></div>` : "";
  renderMenu(); renderProgress();
}
function renderProgress(){
  const total=Math.min(dbLessons.length,lessons.length)||lessons.length;
  const done=[...completed].filter(id=>dbLessons.some(l=>l.id===id)).length;
  const pct=total?Math.round(done/total*100):0;
  $("courseProgress").style.width=pct+"%"; $("courseProgressText").textContent=`${done} из ${total} занятий · ${pct}%`;
}
async function markStarted(){
  const d=dbLesson(current); if(!d)return;
  await supabase.from("lesson_progress").upsert({teacher_id:session.user.id,lesson_id:d.id,status:isDone(current)?"completed":"in_progress",started_at:new Date().toISOString(),updated_at:new Date().toISOString()},{onConflict:"teacher_id,lesson_id"});
  await supabase.from("teacher_courses").update({status:"in_progress",started_at:new Date().toISOString()}).eq("teacher_id",session.user.id).eq("course_id",course.id).eq("status","assigned");
}
$("prevLesson").onclick=async()=>{if(current>0){current--;await markStarted();render()}};
$("nextLesson").onclick=async()=>{if(current<lessons.length-1&&isDone(current)){current++;await markStarted();render()}};
$("completeLesson").onclick=async()=>{
  const d=dbLesson(current);
  if(!d){alert("Для этого занятия нет записи в базе. Запустите supabase/migrations/001_full_schema.sql.");return}
  const now=new Date().toISOString();
  const {error}=await supabase.from("lesson_progress").upsert({teacher_id:session.user.id,lesson_id:d.id,status:"completed",started_at:now,completed_at:now,score:100,updated_at:now},{onConflict:"teacher_id,lesson_id"});
  if(error)return alert(error.message);
  completed.add(d.id);
  const total=Math.min(dbLessons.length,lessons.length);
  if(completed.size>=total) await supabase.from("teacher_courses").update({status:"completed",completed_at:now}).eq("teacher_id",session.user.id).eq("course_id",course.id);
  if(current<lessons.length-1) current++;
  render();
};
init().catch(e=>{console.error(e);alert("Ошибка загрузки курса: "+e.message)});
