const serviceEntry = document.getElementById("service-entry");
const memoryGameEntry = document.getElementById("memory-game-entry");
const ecommerceEntry = document.getElementById("ecommerce-entry");
const analyticsEntry = document.getElementById("analytics-entry");

serviceEntry.addEventListener("click", (e) => {
  window.location.href ="service site/home/index.html";
})
memoryGameEntry.addEventListener("click", (e) => {
  window.location.href = "memory game/index.html";
})
ecommerceEntry.addEventListener("click", (e) => {
  window.location.href = "ecommerce site/index.html"
})
analyticsEntry.addEventListener("click", (e) => {
  window.location.href = "analytics site/index.html"
})