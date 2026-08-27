import { supabase } from "./supabase.js";
import { requireRole, logout, $, esc, fmtDate } from "./utils.js";

async function init(){
 const auth=await requireRole("teacher");if(!auth)return;
 const {session,profile}=auth;$("teacherName").textContent=profile.full_name;
 $("schoolName").textContent=[profile.schools?.name,profile.schools?.city].filter(Boolean).join(" · ");$("logout").onclick=logout;

 const {data:assigned,error}=await supabase.from("teacher_courses")
   .select("id,status,assigned_at,started_at,completed_at,course_id,courses(id,title,slug,description,equipment,lessons(id,lesson_order,title))")
   .eq("teacher_id",session.user.id).order("assigned_at");
 if(error)throw error;$("welcome").classList.add("hidden");

 const {data:progress=[]}=await supabase.from("lesson_progress").select("lesson_id,status,score,completed_at").eq("teacher_id",session.user.id);
 const {data:tests=[]}=await supabase.from("test_results").select("score,created_at,lessons(course_id)").eq("teacher_id",session.user.id).order("created_at",{ascending:false});

 if(!assigned?.length){$("courses").innerHTML='<div class="notice">Вам пока не назначены основные курсы.</div>'}

 const links={"labdisc":"labdisc.html","roqed-science":"roqed.html","raspberry-pi-4":"raspberrypi.html","flashforge-adventurer-5m-pro":"flashforge.html","ruida-rdworks8-medium":"ruida.html","lego-spike-prime":"spike.html","bbc-microbit":"microbit.html","scratch-basics":"scratch.html","python-stem":"pythonstem.html"};
 $("courses").innerHTML=assigned.map(a=>{
   const lessons=a.courses?.lessons||[];
   const done=lessons.filter(l=>progress.some(p=>p.lesson_id===l.id&&p.status==="completed")).length;
   const pct=lessons.length?Math.round(done/lessons.length*100):0;
   const lastTest=tests.find(t=>t.lessons?.course_id===a.course_id);
   const link=links[a.courses?.slug]||"#";
   return `<article class="card course-card">
     <span class="badge">${esc(a.courses?.equipment||"Курс")}</span>
     <h3>${esc(a.courses?.title||"Курс")}</h3>
     <p class="muted">${esc(a.courses?.description||"")}</p>
     <div class="progress"><div style="width:${pct}%"></div></div>
     <div class="small muted">${done} из ${lessons.length} занятий · ${pct}%</div>
     <p><b>Итоговый тест:</b> ${lastTest?lastTest.score+"%":"не пройден"}</p>
     <a class="btn" href="${link}">${pct?"Продолжить обучение":"Начать обучение"}</a>
   </article>`;
 }).join("");


 const {data:optional=[],error:optionalError}=await supabase.rpc("get_optional_courses");
 if(optionalError){console.warn(optionalError);$("optionalCourses").innerHTML='<div class="notice">Дополнительные курсы станут доступны после запуска миграции 011.</div>'}
 else if(!optional?.length){$("optionalCourses").innerHTML='<div class="notice">Дополнительных курсов пока нет.</div>'}
 else{
   $("optionalCourses").innerHTML=optional.map(c=>{
     const link=links[c.slug]||"#";
     const started=!!c.is_started;
     return `<article class="card course-card">
       <span class="badge">По желанию</span>
       <h3>${esc(c.title)}</h3>
       <p class="muted">${esc(c.description||"")}</p>
       <div class="small muted">${c.lesson_count||0} занятий · не влияет на обязательное обучение</div>
       ${started?`<a class="btn" href="${link}">Продолжить курс</a>`:`<button class="btn optional-start" data-slug="${esc(c.slug)}">Начать курс</button>`}
     </article>`;
   }).join("");
   document.querySelectorAll(".optional-start").forEach(b=>b.onclick=async()=>{
     b.disabled=true;b.textContent="Добавляем...";
     const {error}=await supabase.rpc("start_optional_course",{p_course_slug:b.dataset.slug});
     if(error){b.disabled=false;b.textContent="Начать курс";return alert(error.message)}
     location.reload();
   });
 }

 const {data:certs=[]}=await supabase.from("certificates").select("certificate_number,issue_date,final_score,courses(title)").eq("teacher_id",session.user.id).order("issue_date",{ascending:false});
 if(certs.length)$("certificatesBlock").innerHTML=`<div class="page-head"><div><h1>Мои сертификаты</h1></div></div><div class="course-grid">${certs.map(c=>`<div class="card course-card"><h3>${esc(c.courses?.title||"Сертификат")}</h3><div class="kv"><div>Номер</div><div>${esc(c.certificate_number)}</div><div>Дата</div><div>${fmtDate(c.issue_date)}</div><div>Результат</div><div>${c.final_score??"—"}%</div></div><a class="btn success" style="margin-top:16px" href="certificate.html?id=${encodeURIComponent(c.certificate_number)}">Открыть сертификат</a></div>`).join("")}</div>`;
}
init().catch(e=>{console.error(e);$("welcome").textContent="Ошибка загрузки: "+e.message});
