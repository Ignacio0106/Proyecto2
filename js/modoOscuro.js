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

    const logo = document.getElementById('LogoImagen');

    // Revisa si en el localStorage ya se guardó que el modo oscuro está activo ('true')
    if (localStorage.getItem('modoOscuro') === 'true') {
        body.classList.add('dark-mode');
        navbar.classList.replace('bg-primary', 'bg-dark');
        cartBtn.classList.replace('btn-light', 'btn-outline-warning');
        btnToggleDark.classList.replace('btn-outline-light', 'btn-outline-warning');
        // Cambia el icono a sol (para indicar que al presionar va a modo claro)
        btnToggleDark.classList.replace('bi-moon', 'bi-sun');
        logo.src = './img/logoTechZoneBlanco.png';
        logo.alt = 'Logo TechZone Blanco';
        logo.style.width = '150px';
        logo.style.height = '50px';
        logo.style.marginLeft = '10px';
        logo.style.marginTop = '10px';
        logo.style.marginBottom = '10px';
        logo.style.marginRight = '10px';
        logo.style.objectFit = 'contain';
        localStorage.setItem('modoOscuro', 'true');
    } else {
        body.classList.remove('dark-mode');
        navbar.classList.replace('bg-dark', 'bg-primary');
        cartBtn.classList.replace('btn-outline-warning', 'btn-light');
        btnToggleDark.classList.replace('btn-outline-warning', 'btn-outline-light');
        // Cambia el icono a luna (para indicar que al presionar va a modo oscuro)
        btnToggleDark.classList.replace('bi-sun', 'bi-moon');

        localStorage.setItem('modoOscuro', 'false');
    }

    // Agrega un listener para cuando se haga clic en el botón de modo oscuro
    btnToggleDark.addEventListener('click', () => {
        // Alterna (quita o agrega) la clase dark-mode en el body
        // La ventaja de toggle es que si está, la quita; si no está, la pone.
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
        body.classList.add('dark-mode');
        navbar.classList.replace('bg-primary', 'bg-dark');
        cartBtn.classList.replace('btn-light', 'btn-outline-warning');
        btnToggleDark.classList.replace('btn-outline-light', 'btn-outline-warning');
        // Cambia el icono a sol (para indicar que al presionar va a modo claro)
        btnToggleDark.classList.replace('bi-moon', 'bi-sun');
        localStorage.setItem('modoOscuro', 'true');
        } else {
        body.classList.remove('dark-mode');
        navbar.classList.replace('bg-dark', 'bg-primary');
        cartBtn.classList.replace('btn-outline-warning', 'btn-light');
        btnToggleDark.classList.replace('btn-outline-warning', 'btn-outline-light');
        // Cambia el icono a luna (para indicar que al presionar va a modo oscuro)
        btnToggleDark.classList.replace('bi-sun', 'bi-moon');
        localStorage.setItem('modoOscuro', 'false');
        }
    });
});