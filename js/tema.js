function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}
function getTheme() {
    return localStorage.getItem('theme');
}
function aplicarTema(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('btnTemaCompu').innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>'
        document.getElementById('btnTemaCel').innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>'
        saveTheme('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('btnTemaCompu').innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>'
        document.getElementById('btnTemaCel').innerHTML='<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>'
        saveTheme('ligth');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = getTheme();
    if (savedTheme === 'dark' || savedTheme === 'light') { 
        aplicarTema(savedTheme);
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            aplicarTema('dark');
        } else {
            aplicarTema('light');
        }
    }
    document.getElementById("btnTemaCompu").addEventListener("click", function () {
        const temaActual = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        aplicarTema(temaActual === 'dark' ? 'light' : 'dark');
    });
    document.getElementById("btnTemaCel").addEventListener("click", function () {
        const temaActual = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        aplicarTema(temaActual === 'dark' ? 'light' : 'dark');
    });
});

