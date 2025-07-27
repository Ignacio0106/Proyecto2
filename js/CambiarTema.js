document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos del DOM ---
    const themeLink = document.getElementById('theme-link'); // El link que carga el CSS de Bootstrap
    const toggleButton = document.getElementById('btnToggleDark'); // El botón para alternar el tema
    const body = document.body; // El cuerpo de la página
    const navbar = document.getElementById('navbar'); // La barra de navegación por su ID
    const cartBtn = document.getElementById('cartBtn'); // El botón del carrito por su ID
    const logo = document.getElementById('LogoImagen'); // La imagen del logo

    // --- Rutas de Archivos y Clases ---
    // CSS de Bootstrap
    const lightThemePath = './css/bootstrap-lux.min.css';
    const darkThemePath = './css/bootstrap-darkly.min.css';

    // Clases de iconos para el botón (muestra el icono del tema OPUESTO al actual)
    const lightIconClass = 'bi-moon'; // Cuando es tema CLARO, muestra luna (para ir a oscuro)
    const darkIconClass = 'bi-sun';   // Cuando es tema OSCURO, muestra sol (para ir a claro)

    // Rutas de las imágenes del logo
    // Asume que 'LogoPrueba.jpg' es tu logo para el modo CLARO
    // y 'logoTechZoneBlanco.png' es para el modo OSCURO.
    const logoLightSrc = 'img/LogoAzul.jpg';
    const logoDarkSrc = 'img/LogoOscuro.jpg';

    // --- Función Principal: Aplica todos los cambios de tema ---
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            // -- Aplicar Tema Oscuro --
            themeLink.href = darkThemePath; // Cambia el CSS de Bootstrap
            body.classList.remove('fondoBlanco');
            body.classList.add('dark-mode'); // Añade clase general para estilos personalizados

            // Cambios en la Navbar
            if (navbar) {
                navbar.classList.replace('bg-primary', 'bg-dark'); // Fondo oscuro
                navbar.classList.replace('navbar-light', 'navbar-dark'); // Texto claro
                navbar.setAttribute('data-bs-theme', 'dark'); // Para componentes Bootstrap que usan este atributo
            }

            // Cambios en el botón del carrito
            if (cartBtn) {
                cartBtn.classList.replace('btn-light', 'btn-outline-warning'); // Estilo del botón
            }

            // Cambios en el botón de alternar tema
            if (toggleButton) {
                toggleButton.classList.replace('btn-outline-light', 'btn-outline-warning'); // Estilo del botón
                toggleButton.classList.remove(lightIconClass); // Remueve icono de luna
                toggleButton.classList.add(darkIconClass);    // Añade icono de sol
                toggleButton.setAttribute('aria-label', 'Activar tema claro'); // Accesibilidad
            }

            // Cambios en el logo
            if (logo) {
                logo.src = logoDarkSrc; // Cambia la imagen a la versión oscura
                logo.alt = 'Logo TechZone Blanco';
            }

            localStorage.setItem('theme', 'dark'); // Guarda la preferencia
        } else {
            // -- Aplicar Tema Claro --
            themeLink.href = lightThemePath; // Cambia el CSS de Bootstrap
            body.classList.remove('dark-mode'); // Remueve clase general
            body.classList.add('fondoBlanco'); 
            // Cambios en la Navbar
            if (navbar) {
                navbar.classList.replace('bg-dark', 'bg-primary'); // Fondo claro
                navbar.classList.replace('navbar-dark', 'navbar-light'); // Texto oscuro
                navbar.setAttribute('data-bs-theme', 'light'); // Para componentes Bootstrap
            }

            // Cambios en el botón del carrito
            if (cartBtn) {
                cartBtn.classList.replace('btn-outline-warning', 'btn-light'); // Estilo del botón
            }

            // Cambios en el botón de alternar tema
            if (toggleButton) {
                toggleButton.classList.replace('btn-outline-warning', 'btn-outline-light'); // Estilo del botón
                toggleButton.classList.remove(darkIconClass);  // Remueve icono de sol
                toggleButton.classList.add(lightIconClass);    // Añade icono de luna
                toggleButton.setAttribute('aria-label', 'Activar tema oscuro'); // Accesibilidad
            }

            // Cambios en el logo
            if (logo) {
                logo.src = logoLightSrc; // Cambia la imagen a la versión clara
                logo.alt = 'Logo TechZone'; // Restaura el alt original
                // Elimina estilos inline que se hayan aplicado para el modo oscuro
                logo.style.width = '';
                logo.style.height = '';
                logo.style.marginLeft = '';
                logo.style.marginTop = '';
                logo.style.marginBottom = '';
                logo.style.marginRight = '';
                logo.style.objectFit = '';
            }

            localStorage.setItem('theme', 'light'); // Guarda la preferencia
        }
    }

    // --- Inicialización del Tema al Cargar la Página ---
    const savedTheme = localStorage.getItem('theme');
    // Si hay un tema guardado, lo aplicamos. Si no, aplicamos el tema 'light' por defecto.
    // También verificamos el sistema de preferencias del usuario si no hay nada en localStorage.
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Si no hay preferencia guardada, pero el sistema del usuario prefiere oscuro
        applyTheme(true);
    } else {
        // Por defecto, tema claro
        applyTheme(false);
    }

    // --- Event Listener para el Botón de Alternar Tema ---
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Obtenemos el tema actual desde localStorage para alternar
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                applyTheme(false); // Si es oscuro, cambia a claro
            } else {
                applyTheme(true); // Si es claro, cambia a oscuro
            }
        });
    } else {
        console.warn('El botón de alternar tema (#btnToggleDark) no fue encontrado. El cambio de tema no funcionará.');
    }

    // --- Mejoras y Consideraciones ---
    // Puedes añadir console.warn para otros elementos si no los encuentras
    if (!navbar) console.warn('La navbar (#navbar) no fue encontrada. Algunos estilos de tema no se aplicarán.');
    if (!cartBtn) console.warn('El botón del carrito (#cartBtn) no fue encontrado. Algunos estilos de tema no se aplicarán.');
    if (!logo) console.warn('La imagen del logo (#LogoImagen) no fue encontrada. El cambio de logo no funcionará.');
});