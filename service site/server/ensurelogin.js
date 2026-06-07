const user = sessionStorage.getItem("user");
console.log(user);
if (!user) {
  window.location.href = "../login/index.html";
}
