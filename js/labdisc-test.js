import { supabase } from "./supabase.js";
import { requireRole, $, esc } from "./utils.js";
import { questions } from "./labdisc-test-data.js";

let session, course, finalLesson, current=0, selected=new Array(questions.length).fill(null);

async function init(){
  const auth=await requireRole("teacher"); if(!auth)return; session=auth.session;
  const {data:c,error}=await supabase.from("courses").select("id").eq("slug","labdisc").single(); if(error)throw error;course=c;
  const {data:assignment}=await supabase.from("teacher_courses").select("id").eq("teacher_id",session.user.id).eq("course_id",course.id).maybeSingle();
  if(!assignment){alert("Курс не назначен.");return location.replace("teacher.html")}
  const {data:lessons}=await supabase.from("lessons").select("id,lesson_order,title").eq("course_id",course.id).order("lesson_order",{ascending:false}).limit(1);
  finalLesson=lessons?.[0];
  const {count}=await supabase.from("lesson_progress").select("*",{count:"exact",head:true}).eq("teacher_id",session.user.id).eq("status","completed");
  const {count:total}=await supabase.from("lessons").select("*",{count:"exact",head:true}).eq("course_id",course.id).eq("active",true);
  if((count||0)<(total||0)){alert("Сначала завершите все занятия.");return location.replace("labdisc.html")}
  render();
}
function render(){
  const q=questions[current]; $("counter").textContent=`Вопрос ${current+1} из ${questions.length}`; $("testProgress").style.width=((current+1)/questions.length*100)+"%";
  $("questionCard").innerHTML=`<h2>${esc(q.question)}</h2><div class="answers">${q.answers.map((a,i)=>`<button class="answer ${selected[current]===i?"selected":""}" data-i="${i}">${esc(a)}</button>`).join("")}</div><div class="form-actions"><button id="prev" class="btn secondary" ${current===0?"disabled":""}>← Назад</button><button id="next" class="btn" ${selected[current]===null?"disabled":""}>${current===questions.length-1?"Завершить тест":"Далее →"}</button></div>`;
  document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>{selected[current]=Number(b.dataset.i);render()});
  $("prev").onclick=()=>{if(current>0){current--;render()}};
  $("next").onclick=()=>{if(current<questions.length-1){current++;render()}else finish()};
}
async function finish(){
  const correct=questions.reduce((n,q,i)=>n+(selected[i]===q.correct?1:0),0);
  const percent=Math.round(correct/questions.length*100), passed=percent>=80;
  const {error}=await supabase.from("test_results").insert({teacher_id:session.user.id,lesson_id:finalLesson?.id||null,score:percent,answers:{selected,correct,total:questions.length,passed}});
  if(error)return alert(error.message);
  let certificate=null;
  if(passed){
    const {data,error:rpcError}=await supabase.rpc("issue_labdisc_certificate");
    if(!rpcError) certificate=data;
  }
  $("questionCard").classList.add("hidden"); $("resultBox").classList.remove("hidden");
  $("resultBox").innerHTML=`<h2>${passed?"Тест пройден":"Тест не пройден"}</h2><div class="score">${percent}%</div><p>Правильных ответов: <b>${correct} из ${questions.length}</b></p><div class="notice ${passed?"success":"warning"}">${passed?"Поздравляем! Курс успешно завершен.":"Для сертификата необходимо набрать не менее 80%. Вы можете пройти тест повторно."}</div><div class="form-actions" style="justify-content:center">${passed&&certificate?`<a class="btn success" href="certificate.html?id=${encodeURIComponent(certificate)}">Открыть сертификат</a>`:`<a class="btn" href="labdisc-test.html">Пройти еще раз</a>`}<a class="btn secondary" href="teacher.html">В кабинет</a></div>`;
}
init().catch(e=>{console.error(e);alert("Ошибка теста: "+e.message)});
