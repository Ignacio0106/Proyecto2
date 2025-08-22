
// JS para abrir enlaces
const facebookIcon = document.querySelector('.icon.facebook');
facebookIcon?.addEventListener('click', () => window.open('https://www.facebook.com/', '_blank'));

const whatsappIcon = document.querySelector('.icon.whatsapp');
whatsappIcon?.addEventListener('click', () => window.open('https://wa.me/84347968', '_blank'));

const instagramIcon = document.querySelector('.icon.instagram');
instagramIcon?.addEventListener('click', () => window.open('https://www.instagram.com/', '_blank'));



  // Toggle menú móvil
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });