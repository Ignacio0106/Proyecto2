document.addEventListener('DOMContentLoaded', function() {
    const themeLink = document.getElementById('theme-link');
    const toggleButton = document.getElementById('btnTemaCompu') || document.getElementById('btnToggleDark');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('mainHeader');
    const footer = document.getElementById('mainFooter');

    const lightThemePath = './css/bootstrap-lux.min.css';
    const darkThemePath = './css/bootstrap-darkly.min.css';

    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            themeLink.href = darkThemePath;
            body.classList.add('dark-mode');
            body.classList.remove('fondoBlanco');

            // Cambiar clases en lugar de estilos inline
            if (header) {
                header.classList.remove('light-header-footer');
                header.classList.add('dark-header-footer');
            }
            if (navbar) {
                navbar.classList.remove('light-header-footer');
                navbar.classList.add('dark-header-footer');
            }
            if (footer) {
                footer.classList.remove('light-header-footer');
                footer.classList.add('dark-header-footer');
            }

            localStorage.setItem('theme', 'dark');
        } else {
            themeLink.href = lightThemePath;
            body.classList.remove('dark-mode');
            body.classList.add('fondoBlanco');

            if (header) {
                header.classList.remove('dark-header-footer');
                header.classList.add('light-header-footer');
            }
            if (navbar) {
                navbar.classList.remove('dark-header-footer');
                navbar.classList.add('light-header-footer');
            }
            if (footer) {
                footer.classList.remove('dark-header-footer');
                footer.classList.add('light-header-footer');
            }

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
