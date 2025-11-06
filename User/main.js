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
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!name || !email || !password) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users"));
      if (users.find(u => u.email === email)) {
        alert("❌ Email already exists!");
        return;
      }

      users.push({ name, email, password, role: "user" });
      localStorage.setItem("users", JSON.stringify(users));
      alert(`🎉 Welcome ${name}! Your account has been created. Redirecting to login...`);
      setTimeout(() => {
        window.location.href = "../Ulogin.html";
      }, 500);
    });
  }

  // =====================
  // LOGIN
  // =====================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("❌ Invalid email or password!");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      alert(`✅ Login successful! Welcome ${user.name}`);

      if (user.role === "admin") {
        setTimeout(() => {
          window.location.href = "admin/dashboard.html";
        }, 300);
      } else {
        setTimeout(() => {
          window.location.href = "USER/dashboard.html";
        }, 300);
      }
    });
  }

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
});
