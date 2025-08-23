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
                  this.reset();
          }
        });
});

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