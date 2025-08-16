document.addEventListener("DOMContentLoaded", function() {

    // --- Para ejercicios.html ---
    function comprobarRespuesta() {
        const opcionSeleccionada = document.querySelector('input[name="comparacion"]:checked');
        const mensajeResultado = document.querySelector('.result-message');
        if (opcionSeleccionada) {
            if (opcionSeleccionada.value === "menor") {
                mensajeResultado.textContent = "¡Respuesta correcta!";
                mensajeResultado.style.color = "green";
            } else {
                mensajeResultado.textContent = "Respuesta incorrecta. Intenta de nuevo.";
                mensajeResultado.style.color = "red";
            }
        } else {
            alert("Por favor, selecciona una opción.");
        }
    }
    const botonComprobar = document.getElementById('botonComprobar');
    if (botonComprobar) {
        botonComprobar.addEventListener('click', comprobarRespuesta);
    }

    // --- Para desafios.html ---
    const codigoSecreto = 2514; 
    const inputCodigo = document.getElementById("codigo-secreto");
    const botonVerificar = document.getElementById("boton-verificar");
    const contenedorCertificado = document.getElementById("contenedor-certificado");
    const nombreInput = document.getElementById('nombre-estudiante-input');
    const botonCertificado = document.getElementById('boton-certificado');
    const certificadoDescarga = document.getElementById('certificado-a-descargar');
    const nombreCertificado = document.getElementById('nombre-certificado');

    if (botonVerificar && inputCodigo && contenedorCertificado) {
        botonVerificar.addEventListener('click', function() {
            const codigoIngresado = parseInt(inputCodigo.value);

            if (codigoIngresado === codigoSecreto) {
                contenedorCertificado.style.display = "block";
                alert("¡Código correcto! Ahora puedes generar tu certificado.");
            } else {
                alert("Código incorrecto. Intenta de nuevo.");
            }
        });
    }
    
    // Para generar y descargar el certificado 
    if (botonCertificado && nombreInput && certificadoDescarga) {
        botonCertificado.addEventListener('click', function() {
            const nombre = nombreInput.value;
            if (nombre.trim() === "") {
                alert("Por favor, ingresa tu nombre.");
                return;
            }

            nombreCertificado.textContent = nombre;
            
            // Hacer visible el contenedor 
            certificadoDescarga.style.display = 'block';

            const { jsPDF } = window.jspdf;
            html2canvas(certificadoDescarga, { 
                scale: 2,
                logging: true 
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [certificadoDescarga.offsetWidth, certificadoDescarga.offsetHeight]
                });
                
                pdf.addImage(imgData, 'PNG', 0, 0, certificadoDescarga.offsetWidth, certificadoDescarga.offsetHeight);
                pdf.save(`Certificado_${nombre}.pdf`);

                // Volver a ocultar el contenedor después de la descarga
                certificadoDescarga.style.display = 'none';
            }).catch(error => {
                console.error("Error al generar el certificado:", error);
                alert("Ocurrió un error al generar el certificado. Por favor, revisa la consola del navegador.");
            });
        });
    }
});