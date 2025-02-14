// Comportamento de abrir e fechar o menu hambúrguer
const menuCelular = document.getElementById("menu-celular");
const menu = document.getElementById("menu");

menuCelular.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuCelular.classList.toggle("open");
});


// garante que as imagens já estejam armazenadas no cache do navegador antes de serem aplicadas no CSS.
const imagensParaCarregar = [
  "./assets/img/fundo-jalabet.jpg",
  "./assets/img/fundo-perguntas.png",
];

imagensParaCarregar.forEach(src => {
  const img = new Image();
  img.src = src;
});
