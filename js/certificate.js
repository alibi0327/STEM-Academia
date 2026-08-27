import { supabase } from "./supabase.js";
import { requireRole, $, esc, fmtDate } from "./utils.js";
async function init(){
 const auth=await requireRole("teacher");if(!auth)return;
 const number=new URLSearchParams(location.search).get("id"); if(!number)return $("certificate").innerHTML="<h2>Сертификат не найден</h2>";
 const {data:c,error}=await supabase.from("certificates").select("certificate_number,issue_date,final_score,teacher_id,profiles!certificates_teacher_id_fkey(full_name,schools(name,city)),courses(title)").eq("certificate_number",number).eq("teacher_id",auth.session.user.id).single();
 if(error)throw error;
 $("certificate").innerHTML=`<div class="brand" style="justify-content:center"><div class="brand-mark">S</div> STEM <span>ACADEMIA</span></div><h1>СЕРТИФИКАТ</h1><p class="muted">настоящим подтверждается, что</p><div class="cert-name">${esc(c.profiles?.full_name||"")}</div><p>успешно прошел(а) программу обучения</p><h2>«${esc(c.courses?.title||"Работа с LabDisc")}»</h2><p>${esc(c.profiles?.schools?.name||"")} ${c.profiles?.schools?.city?"· "+esc(c.profiles.schools.city):""}</p><div class="cert-grid"><div><div class="muted small">Номер сертификата</div><b>${esc(c.certificate_number)}</b></div><div><div class="muted small">Дата выдачи</div><b>${fmtDate(c.issue_date)}</b></div><div><div class="muted small">Итоговый результат</div><b>${c.final_score??"—"}%</b></div><div><div class="muted small">Организация</div><b>STEM Academia</b></div></div>`;
}
init().catch(e=>$("certificate").innerHTML=`<h2>Не удалось открыть сертификат</h2><p>${esc(e.message)}</p>`);
