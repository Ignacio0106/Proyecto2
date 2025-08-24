document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("dropdownNavbarLink");
  const dropdownMenu = document.getElementById("dropdownNavbar");

  // Alternar visibilidad del menú al hacer clic en el botón
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Evita que el clic se propague al documento
    dropdownMenu.classList.toggle("hidden");
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdownMenu.classList.add("hidden");
    }
  });
});

  // Menú responsive
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
