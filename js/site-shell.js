(()=>{
 const logo='assets/brand/logo.png';
 const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();

 const dict={
  ru:{developed:'Разработано Әліби Түлкібай'},
  kk:{developed:'Әзірлеген Әліби Түлкібай'}
 };
 let lang=localStorage.getItem('stem_lang')||'ru';

 const publicPages=new Set(['index.html','login.html','verify.html','404.html']);
 const printPages=new Set(['certificate.html']);
 const adminPages=new Set(['admin.html','admin-v3.html','admin-analytics.html','reports.html','group-assign.html','practice-review.html','course-publish.html']);
 const schoolPages=new Set(['school-admin.html']);
 const customPages=new Set(['teacher.html']);

 function brand(){
  document.querySelectorAll('.brand').forEach(b=>{
   let mark=b.querySelector('.brand-mark');
   if(mark){
    mark.innerHTML=`<img src="${logo}" alt="STEM Academia">`;
    mark.classList.add('brand-logo');
   }else if(!b.querySelector('.brand-inline-logo')){
    b.insertAdjacentHTML('afterbegin',`<img class="brand-inline-logo" src="${logo}" alt="STEM Academia">`);
   }
  });
 }

 function translate(l){
  lang=l;
  localStorage.setItem('stem_lang',l);
  document.documentElement.lang=l==='kk'?'kk':'ru';
  document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  document.querySelectorAll('[data-site-developed]').forEach(x=>x.textContent=dict[l].developed);
 }

 function addLang(){
  if(document.querySelector('.lang-switch')) return;
  const top=document.querySelector('.topbar');
  const pub=document.querySelector('.public-header');
  const host=top?.querySelector('.userbox')||top?.lastElementChild||pub;
  if(!host)return;
  const s=document.createElement('div');
  s.className='lang-switch';
  s.innerHTML='<button type="button" data-lang="ru">Рус</button><button type="button" data-lang="kk">Қаз</button>';
  if(host.classList?.contains('userbox')) host.prepend(s); else host.appendChild(s);
  s.querySelectorAll('button').forEach(b=>b.onclick=()=>translate(b.dataset.lang));
 }

 function nav(role){
  if(role==='admin') return [
   ['admin.html','⌂','Главная'],
   ['admin-v3.html','✦','V3 Центр'],
   ['admin-analytics.html','◫','Аналитика'],
   ['reports.html','▤','Отчёты'],
   ['group-assign.html','▣','Назначения'],
   ['practice-review.html','☑','Практические работы'],
   ['course-publish.html','◇','Публикация курсов']
  ];
  if(role==='school') return [
   ['school-admin.html','⌂','Панель школы'],
   ['reports.html','▤','Отчёты'],
   ['teacher.html','←','Кабинет']
  ];
  return [
   ['teacher.html','⌂','Главная'],
   ['search.html','⌕','Поиск'],
   ['practice.html','☑','Практические работы'],
   ['workspace.html','✎','Заметки и избранное'],
   ['notifications.html','♧','Уведомления'],
   ['profile.html','○','Профиль'],
   ['ai.html','?','AI-помощник']
  ];
 }

 function shellRole(){
  if(adminPages.has(page))return'admin';
  if(schoolPages.has(page))return'school';
  return'teacher';
 }

 function addSidebar(){
  if(publicPages.has(page)||printPages.has(page)||customPages.has(page))return;
  if(document.querySelector('.global-sidebar'))return;

  const role=shellRole();
  document.body.classList.add('global-dark-page','global-role-'+role);

  const children=[...document.body.children];
  const workspace=document.createElement('div');
  workspace.className='global-workspace';

  children.forEach(el=>{
   if(el.tagName==='SCRIPT') return;
   workspace.appendChild(el);
  });

  const side=document.createElement('aside');
  side.className='global-sidebar';
  const links=nav(role).map(([href,icon,label])=>{
   const active=page===href.toLowerCase();
   return `<a href="${href}" class="${active?'active':''}"><span>${icon}</span>${label}</a>`;
  }).join('');
  side.innerHTML=`
   <div class="global-side-brand">
    <img src="${logo}" alt="STEM Academia">
    <div><b>STEM ACADEMIA</b><small>${role==='admin'?'Панель администратора':role==='school'?'Панель школы':'Платформа обучения'}</small></div>
   </div>
   <nav>${links}</nav>
   <div class="global-side-credit">
    <img src="${logo}" alt="">
    <span data-site-developed>${dict[lang].developed}</span>
   </div>`;

  document.body.insertBefore(side,document.body.firstChild);
  document.body.insertBefore(workspace,side.nextSibling);
 }

 function publicStyle(){
  if(publicPages.has(page))document.body.classList.add('global-public-dark');
  if(printPages.has(page))document.body.classList.add('global-print-page');
 }

 function credit(){
  if(document.querySelector('.site-credit')||customPages.has(page)||document.querySelector('.global-side-credit'))return;
  const f=document.createElement('footer');
  f.className='site-credit';
  f.innerHTML=`<img src="${logo}" alt=""><span data-site-developed>${dict[lang].developed}</span>`;
  document.body.appendChild(f);
 }

 function shell(){
  brand();
  publicStyle();
  addSidebar();
  addLang();
  credit();
  translate(lang);
 }

 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',shell);else shell();
})();