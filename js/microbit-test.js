import {supabase} from "./supabase.js";
import {requireRole,$,esc} from "./utils.js";
import {questions} from "./microbit-test-data.js";
let session,course,last,current=0,sel=Array(questions.length).fill(null);

async function init(){
 const a=await requireRole("teacher");if(!a)return;session=a.session;
 let r=await supabase.from("courses").select("id").eq("slug","bbc-microbit").single();if(r.error)throw r.error;course=r.data;
 let asg=await supabase.from("teacher_courses").select("id").eq("teacher_id",session.user.id).eq("course_id",course.id).maybeSingle();
 if(!asg.data){alert("Курс BBC micro:bit не назначен.");return location.replace("teacher.html")}
 r=await supabase.from("lessons").select("id").eq("course_id",course.id).order("lesson_order",{ascending:false}).limit(1);last=r.data?.[0];
 const {count}=await supabase.from("lesson_progress").select("*,lessons!inner(course_id)",{count:"exact",head:true}).eq("teacher_id",session.user.id).eq("status","completed").eq("lessons.course_id",course.id);
 const {count:total}=await supabase.from("lessons").select("*",{count:"exact",head:true}).eq("course_id",course.id).eq("active",true);
 if((count||0)<(total||0)){alert("Сначала завершите все занятия.");return location.replace("microbit.html")}
 render();
}
function render(){
 const q=questions[current];$("counter").textContent=`Вопрос ${current+1} из ${questions.length}`;$("testProgress").style.width=(current+1)/questions.length*100+"%";
 $("questionCard").innerHTML=`<h2>${esc(q.question)}</h2><div class="answers">${q.answers.map((a,i)=>`<button class="answer ${sel[current]===i?"selected":""}" data-i="${i}">${esc(a)}</button>`).join("")}</div><div class="form-actions"><button id="prev" class="btn secondary" ${current===0?"disabled":""}>← Назад</button><button id="next" class="btn" ${sel[current]===null?"disabled":""}>${current===questions.length-1?"Завершить тест":"Далее →"}</button></div>`;
 document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>{sel[current]=+b.dataset.i;render()});
 $("prev").onclick=()=>{if(current>0){current--;render()}};
 $("next").onclick=()=>current<questions.length-1?(current++,render()):finish();
}
async function finish(){
 const correct=questions.reduce((n,q,i)=>n+(sel[i]===q.correct),0),score=Math.round(correct/questions.length*100),passed=score>=80;
 let r=await supabase.from("test_results").insert({teacher_id:session.user.id,lesson_id:last?.id||null,score,answers:{selected:sel,passed,course:"bbc-microbit"}});
 if(r.error)return alert(r.error.message);
 let cert=null;
 if(passed){r=await supabase.rpc("issue_course_certificate",{p_course_slug:"bbc-microbit"});if(!r.error)cert=r.data}
 $("questionCard").classList.add("hidden");$("resultBox").classList.remove("hidden");
 $("resultBox").innerHTML=`<h2>${passed?"Тест пройден":"Тест не пройден"}</h2><div class="score">${score}%</div><p>${correct} из ${questions.length} правильных ответов</p><div class="notice ${passed?"success":"warning"}">${passed?"Курс BBC micro:bit успешно завершен.":"Для сертификата необходимо минимум 80%."}</div><div class="form-actions" style="justify-content:center">${passed&&cert?`<a class="btn success" href="certificate.html?id=${encodeURIComponent(cert)}">Открыть сертификат</a>`:'<a class="btn" href="microbit-test.html">Пройти повторно</a>'}<a class="btn secondary" href="teacher.html">В кабинет</a></div>`;
}
init().catch(e=>alert(e.message));