document.addEventListener('DOMContentLoaded', function() {
    const themeLink = document.getElementById('theme-link');
    const toggleButton = document.getElementById('btnToggleDark');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const cartBtn = document.getElementById('cartBtn');
    const logo = document.getElementById('LogoImagen');
    const footer = document.querySelector('footer'); // <--- footer agregado

    const lightThemePath = './css/bootstrap-lux.min.css';
    const darkThemePath = './css/bootstrap-darkly.min.css';

    const lightIconClass = 'bi-moon';
    const darkIconClass = 'bi-sun';

    const logoLightSrc = 'img/LogoAzul.jpg';
    const logoDarkSrc = 'img/LogoOscuro.jpg';

    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            themeLink.href = darkThemePath;
            body.classList.remove('fondoBlanco');
            body.classList.add('dark-mode');

            if (navbar) {
                navbar.style.backgroundColor = '#303030';
                navbar.classList.replace('navbar-light', 'navbar-dark');
                navbar.setAttribute('data-bs-theme', 'dark');
            }

            if (cartBtn) cartBtn.classList.replace('btn-light', 'btn-outline-warning');

            if (toggleButton) {
                toggleButton.classList.replace('btn-outline-light', 'btn-outline-warning');
                toggleButton.classList.remove(lightIconClass);
                toggleButton.classList.add(darkIconClass);
                toggleButton.setAttribute('aria-label', 'Activar tema claro');
            }

            if (logo) {
                logo.src = logoDarkSrc;
                logo.alt = 'Logo TechZone Blanco';
            }

            if (footer) footer.style.backgroundColor = '#303030'; // Color oscuro para footer

            localStorage.setItem('theme', 'dark');
        } else {
            themeLink.href = lightThemePath;
            body.classList.remove('dark-mode');
            body.classList.add('fondoBlanco');

            if (navbar) {
                navbar.style.backgroundColor = '#385a7f';
                navbar.classList.replace('navbar-dark', 'navbar-light');
                navbar.setAttribute('data-bs-theme', 'light');
            }

            if (cartBtn) cartBtn.classList.replace('btn-outline-warning', 'btn-light');

            if (toggleButton) {
                toggleButton.classList.replace('btn-outline-warning', 'btn-outline-light');
                toggleButton.classList.remove(darkIconClass);
                toggleButton.classList.add(lightIconClass);
                toggleButton.setAttribute('aria-label', 'Activar tema oscuro');
            }

            if (logo) {
                logo.src = logoLightSrc;
                logo.alt = 'Logo TechZone';
                logo.style.width = '';
                logo.style.height = '';
                logo.style.margin = '';
                logo.style.objectFit = '';
            }

            if (footer) footer.style.backgroundColor = '#385a7f'; // Color claro para footer

            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const currentTheme = localStorage.getItem('theme');
            applyTheme(currentTheme !== 'dark');
        });
    }
});
