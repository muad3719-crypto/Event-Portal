// =====================
// MAIN.JS - Event Portal System
// =====================

// Initialize data if not exists
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}
if (!localStorage.getItem("events")) {
  localStorage.setItem("events", JSON.stringify([]));
}
if (!localStorage.getItem("eventRequests")) {
  localStorage.setItem("eventRequests", JSON.stringify([]));
}
if (!localStorage.getItem("registrations")) {
  localStorage.setItem("registrations", JSON.stringify([]));
}

// Create default admin user
const users = JSON.parse(localStorage.getItem("users"));
if (!users.find(u => u.email === "admin@limu.edu.ly")) {
  users.push({
    name: "Admin",
    email: "admin@limu.edu.ly",
    password: "admin123",
    role: "admin"
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// =====================
// SIGNUP
// =====================


  // =====================
  // LOGOUT
  // =====================
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("👋 Logged out successfully!");
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin")) {
        window.location.href = "../Ulogin.html";
      } else {
        window.location.href = "../Ulogin.html";
      }
    });
  }

  // =====================
  // CHECK AUTHENTICATION
  // =====================
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("dashboard.html") || currentPath.includes("calendar.html") ||
        currentPath.includes("eventregister.html") || currentPath.includes("eventview.html")) {
      window.location.href = "../Ulogin.html";
    }
  }

