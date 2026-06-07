const user = sessionStorage.getItem("user");
if (!user) {
  window.location.href = "../login/index.html";
}