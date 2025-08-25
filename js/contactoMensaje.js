document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener("submit", function (e) {
          e.preventDefault();
          const response = grecaptcha.getResponse();
          if (response.length === 0) {
                toastr.error("Por favor verifica el captcha",
    'Error')
          } else {
                toastr.info("Gracias por contactarnos",
    'Información Enviada')
                  mostrarResumen()
                  grecaptcha.reset();
                  this.reset();
          }
        });
});

function ocultarResumen(){
      document.getElementById("resultadoForm").classList.add("hidden");
      document.getElementById("toddoContacto").classList.remove("hidden");
      document.getElementById("resumen-mensaje").textContent = "";
      document.getElementById("resumen-nombre").textContent = "";
      document.getElementById("resumen-email").textContent = "";
      document.getElementById("resumen-telefono").textContent = "";
      document.getElementById("resumen-fecha").textContent = "";
      document.getElementById("resumen-genero").textContent = "";
      document.getElementById("resumen-consulta").textContent = "";
}
function mostrarResumen(){
      document.getElementById("resultadoForm").classList.remove("hidden");
      document.getElementById("toddoContacto").classList.add("hidden");
      const form = document.getElementById("contact-form");
      document.getElementById("resumen-nombre").textContent = form.nombre.value;
      document.getElementById("resumen-email").textContent = form.email.value;
      document.getElementById("resumen-telefono").textContent = form.telefono.value;
      document.getElementById("resumen-fecha").textContent = form.fechaNacimiento.value;
      document.getElementById("resumen-genero").textContent = form.genero.value;
      document.getElementById("resumen-consulta").textContent = form.tipoConsulta.value;
      document.getElementById("resumen-mensaje").textContent = form.Mensaje.value;
}
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "show",
  "hideMethod": "fadeOut"
}