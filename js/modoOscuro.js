// Espera a que todo el contenido HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene el botón que cambia el modo oscuro (debe tener id="btnToggleDark")
  const btnToggleDark = document.getElementById('btnToggleDark');
  // Obtiene el elemento <body> completo
  const body = document.body;
  // Obtiene la barra de navegación con clase 'navbar'
  const navbar = document.querySelector('nav.navbar');
  // Obtiene el botón del carrito (clases btn y position-relative)
  const cartBtn = document.querySelector('.btn.position-relative');

  // Revisa si en el localStorage ya se guardó que el modo oscuro está activo ('true')
  if(localStorage.getItem('modoOscuro') === 'true'){
    // Agrega la clase dark-mode al body para activar estilos oscuros generales
    body.classList.add('dark-mode');
    // Cambia la clase del navbar de bg-primary (claro) a bg-dark (oscuro)
    navbar.classList.replace('bg-primary', 'bg-dark');
    // Cambia la clase del botón carrito de btn-light a btn-outline-warning (más visible en modo oscuro)
    cartBtn.classList.replace('btn-light', 'btn-outline-warning');
    // Cambia el texto del botón para indicar que ahora puede cambiar a modo claro
    btnToggleDark.textContent = 'Modo Claro';
    // Cambia el estilo del botón para que tenga colores compatibles con modo oscuro
    btnToggleDark.classList.replace('btn-outline-light', 'btn-outline-warning');
  }

  // Agrega un listener para cuando se haga clic en el botón de modo oscuro
  btnToggleDark.addEventListener('click', () => {
    // Alterna (quita o agrega) la clase dark-mode en el body
    body.classList.toggle('dark-mode');

    // Si el body ya tiene la clase dark-mode (modo oscuro activo)
    if (body.classList.contains('dark-mode')) {
      // Cambia la barra de navegación para que tenga fondo oscuro
      navbar.classList.replace('bg-primary', 'bg-dark');
      // Cambia el botón del carrito para que tenga estilo visible en modo oscuro
      cartBtn.classList.replace('btn-light', 'btn-outline-warning');
      // Cambia el texto del botón para indicar que al presionar puede volver a modo claro
      btnToggleDark.textContent = 'Modo Claro';
      // Cambia el estilo del botón para modo oscuro
      btnToggleDark.classList.replace('btn-outline-light', 'btn-outline-warning');
      // Guarda la preferencia en localStorage como 'true' para recordar modo oscuro
      localStorage.setItem('modoOscuro', 'true');
    } else {
      // Si el modo oscuro está desactivado (modo claro)
      // Cambia el navbar a fondo primario (claro)
      navbar.classList.replace('bg-dark', 'bg-primary');
      // Cambia el botón del carrito a estilo claro
      cartBtn.classList.replace('btn-outline-warning', 'btn-light');
      // Cambia el texto del botón para que diga que se puede activar modo oscuro
      btnToggleDark.textContent = 'Modo Oscuro';
      // Cambia el estilo del botón para modo claro
      btnToggleDark.classList.replace('btn-outline-warning', 'btn-outline-light');
      // Guarda la preferencia en localStorage como 'false' para recordar modo claro
      localStorage.setItem('modoOscuro', 'false');
    }
  });
});
