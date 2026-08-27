
:root{
  --bg:#f4f7fb;--surface:#fff;--surface2:#f8fafc;--text:#152033;--muted:#667085;
  --line:#e5eaf1;--primary:#2563eb;--primary2:#1d4ed8;--success:#16a34a;
  --danger:#dc2626;--warning:#d97706;--sidebar:#0f172a;--shadow:0 18px 50px rgba(15,23,42,.08)
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,Arial,Helvetica,sans-serif;background:var(--bg);color:var(--text)}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit}
button{border:0;cursor:pointer}
.hidden{display:none!important}
.muted{color:var(--muted)}
.small{font-size:13px}
.brand{display:flex;align-items:center;gap:10px;font-weight:900;letter-spacing:.02em}
.brand-mark{width:38px;height:38px;border-radius:11px;background:var(--primary);display:grid;place-items:center;color:white}
.brand span{color:var(--primary)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 16px;border-radius:10px;background:var(--primary);color:white;font-weight:700}
.btn:hover{background:var(--primary2)}
.btn.secondary{background:#eef2f7;color:#23314b}
.btn.danger{background:#fee2e2;color:#991b1b}
.btn.success{background:#dcfce7;color:#166534}
.btn:disabled{opacity:.55;cursor:not-allowed}
.field{display:grid;gap:7px}
.field label{font-size:13px;font-weight:700;color:#344054}
input,select,textarea{width:100%;border:1px solid #d0d5dd;background:white;border-radius:10px;padding:11px 13px;outline:none}
input:focus,select:focus,textarea:focus{border-color:#84a9ff;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.card{background:white;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow)}
.notice{padding:14px 16px;border:1px solid #bfdbfe;background:#eff6ff;border-radius:12px;color:#1e40af}
.notice.warning{border-color:#fed7aa;background:#fff7ed;color:#9a3412}
.notice.success{border-color:#bbf7d0;background:#f0fdf4;color:#166534}

/* LOGIN */
.login-page{min-height:100vh;background:linear-gradient(135deg,#eef4ff,#f8fbff);display:flex;flex-direction:column}
.public-header{height:76px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 5vw}
.login-main{flex:1;display:grid;place-items:center;padding:48px 22px}
.login-shell{width:min(1100px,100%);display:grid;grid-template-columns:1.2fr 430px;gap:70px;align-items:center}
.hero h1{font-size:54px;line-height:1.05;margin:0 0 22px;letter-spacing:-.04em}
.hero h1 span{color:var(--primary)}
.hero p{font-size:18px;line-height:1.7;color:var(--muted);max-width:620px}
.features{display:grid;gap:14px;margin-top:30px}
.feature{display:flex;align-items:center;gap:12px;color:#344054}
.tick{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#dbeafe;color:#1d4ed8;font-weight:900}
.login-card{padding:34px}
.login-card h2{margin:0 0 8px;font-size:28px}
.login-form{display:grid;gap:18px;margin-top:26px}
.error{color:var(--danger);min-height:20px;font-size:14px}

/* APP */
.topbar{height:70px;background:white;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:sticky;top:0;z-index:20}
.userbox{display:flex;align-items:center;gap:12px}
.app{display:grid;grid-template-columns:240px minmax(0,1fr);min-height:calc(100vh - 70px)}
.sidebar{background:var(--sidebar);padding:22px 14px;display:flex;flex-direction:column;gap:6px}
.navbtn{width:100%;text-align:left;padding:12px 14px;border-radius:10px;background:transparent;color:#cbd5e1;font-weight:650}
.navbtn:hover,.navbtn.active{background:#1e293b;color:white}
.main{padding:30px;min-width:0}
.page{display:none}
.page.active{display:block}
.page-head{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:24px}
.page-head h1{margin:0;font-size:30px}
.stats{display:grid;grid-template-columns:repeat(4,minmax(150px,1fr));gap:16px}
.stat{padding:20px}
.stat b{display:block;font-size:34px;margin-bottom:6px}
.stat span{color:var(--muted)}
.panel{padding:20px;margin-bottom:18px}
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.form-actions{display:flex;gap:10px;align-items:center;margin-top:16px}
.tablewrap{overflow:auto;border:1px solid var(--line);border-radius:14px;background:white}
table{width:100%;border-collapse:collapse;min-width:720px}
th,td{text-align:left;padding:13px 14px;border-bottom:1px solid var(--line);vertical-align:middle}
th{font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:#667085;background:#f8fafc}
tr:last-child td{border-bottom:0}
.badge{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:12px;font-weight:800;background:#eef2ff;color:#3730a3}
.badge.good{background:#dcfce7;color:#166534}
.badge.off{background:#f1f5f9;color:#475569}
.actions{display:flex;gap:8px;flex-wrap:wrap}
.course-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
.course-card{padding:22px}
.course-card h3{margin:0 0 8px}
.progress{height:10px;background:#e7edf5;border-radius:999px;overflow:hidden;margin:14px 0 8px}
.progress>div{height:100%;background:linear-gradient(90deg,#2563eb,#16a34a)}
.kv{display:grid;grid-template-columns:160px 1fr;gap:8px;margin-top:12px}
.kv div:nth-child(odd){color:var(--muted)}

/* LABDISC COURSE */
.course-layout{display:grid;grid-template-columns:300px minmax(0,1fr);min-height:calc(100vh - 70px)}
.lesson-sidebar{background:white;border-right:1px solid var(--line);padding:18px;overflow:auto;height:calc(100vh - 70px);position:sticky;top:70px}
.lesson-menu{display:grid;gap:6px}
.module-title{font-size:12px;text-transform:uppercase;color:#98a2b3;font-weight:800;margin:18px 8px 7px}
.lesson-link{border:0;background:#f8fafc;color:#344054;text-align:left;padding:11px 12px;border-radius:10px}
.lesson-link.active{background:#dbeafe;color:#1d4ed8;font-weight:800}
.lesson-link.done{background:#f0fdf4;color:#166534}
.lesson-link.locked{opacity:.5}
.lesson-content{padding:34px;max-width:980px;width:100%;margin:auto}
.lesson-header{margin-bottom:22px}
.lesson-header h1{margin:6px 0 8px;font-size:34px}
.lesson-body .visual{background:linear-gradient(135deg,#1d4ed8,#0f766e);color:white;border-radius:20px;padding:35px;margin-bottom:20px}
.lesson-body .visual-content{text-align:center}
.lesson-body .visual-icon{font-size:50px}
.lesson-body .visual-title{font-size:25px;font-weight:900;margin:12px 0 6px}
.lesson-body .block{background:white;border:1px solid var(--line);border-radius:16px;padding:22px;margin:16px 0;line-height:1.7}
.lesson-body .block h2{margin-top:0}
.lesson-body .block.info{background:#eff6ff}
.lesson-body .models,.lesson-body .sensor-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
.lesson-footer{display:flex;justify-content:space-between;gap:12px;align-items:center;margin:24px 0 50px}
.final-box{margin-top:22px}

/* TEST */
.test-shell{max-width:780px;margin:40px auto;padding:0 20px}
.question-card{padding:28px}
.answers{display:grid;gap:10px;margin-top:20px}
.answer{border:1px solid var(--line);padding:14px;border-radius:12px;background:white;text-align:left}
.answer.selected{border-color:#2563eb;background:#eff6ff}
.test-progress{margin:16px 0}
.result-box{text-align:center;padding:35px}
.score{font-size:64px;font-weight:900;color:#1d4ed8}

/* CERTIFICATE */
.cert-wrap{max-width:1000px;margin:30px auto;padding:20px}
.certificate{background:white;border:12px solid #0f172a;padding:60px;text-align:center;min-height:650px;display:flex;flex-direction:column;justify-content:center}
.certificate h1{font-size:46px;letter-spacing:.12em;margin:12px 0}
.cert-name{font-size:34px;font-weight:900;color:#1d4ed8;margin:25px 0}
.cert-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:35px}
@media print{.no-print{display:none!important}body{background:white}.cert-wrap{margin:0;padding:0}.certificate{border:8px solid #111;min-height:95vh}}
@media(max-width:900px){
  .login-shell{grid-template-columns:1fr;gap:30px}.hero{display:none}
  .app{grid-template-columns:1fr}.sidebar{flex-direction:row;overflow:auto}.navbtn{white-space:nowrap;width:auto}
  .stats{grid-template-columns:repeat(2,1fr)}
  .course-layout{grid-template-columns:1fr}.lesson-sidebar{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line)}
}
@media(max-width:620px){
  .topbar{padding:0 14px}.main{padding:20px 14px}.form-grid{grid-template-columns:1fr}.stats{grid-template-columns:1fr}
  .page-head{align-items:flex-start;flex-direction:column}.lesson-content{padding:22px 14px}.lesson-header h1{font-size:28px}
}
