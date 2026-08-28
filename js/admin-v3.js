import { requireRole, logout, $ } from "./utils.js";

async function init() {
  const auth = await requireRole(["admin", "school_admin"]);
  if (!auth) return;

  const logoutButton = $("logout");
  if (logoutButton) logoutButton.onclick = logout;

  const oldPanel = document.querySelector('a[href="admin.html"]');
  if (oldPanel && auth.profile.role === "school_admin") {
    oldPanel.href = "school-admin.html";
    oldPanel.textContent = "← Панель школы";
  }
}

init().catch(console.error);
