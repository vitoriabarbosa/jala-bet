// Comportamento de abrir e fechar o menu hambúrguer
const menuCelular = document.getElementById("menu-celular");
const menu = document.getElementById("menu");

menuCelular.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuCelular.classList.toggle("open");
});