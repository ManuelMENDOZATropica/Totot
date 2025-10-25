document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha');
  if (fechaInput && !fechaInput.value) {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    fechaInput.value = formatted;
  }
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('briefForm'); // Asegúrate de añadir id="briefForm" al <form>
    const formUrl = "https://tropica.app.n8n.cloud/webhook/dce0d6a3-288d-474a-b551-04c866cc2ed4";
    const mainLayout = document.querySelector('.layout'); // El contenedor de todo el contenido
    const customMessage = `
        <div class="custom-success-message" style="text-align: center; padding: 50px;">
            <h1>¡Brief Recibido con Éxito!</h1>
            <p>Gracias por enviar tu brief. El equipo de Totot analizará la información y se pondrá en contacto contigo pronto.</p>
            <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Volver a Inicio</a>
        </div>
    `; // Puedes hacer que este mensaje sea tan complejo como quieras.

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Detiene el envío normal del formulario

        // Muestra un mensaje de carga (opcional)
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Recopila los datos del formulario
        const formData = new FormData(form);

        fetch(formUrl, {
            method: 'POST',
            body: formData,
            // n8n espera que el formulario se envíe como 'multipart/form-data'
            // FormData lo hace automáticamente, no necesitas el header Content-Type
        })
        .then(response => {
            // No importa la respuesta de n8n, siempre que la petición sea exitosa (código 200)
            if (response.ok) {
                // Oculta el formulario y muestra el mensaje personalizado
                if (mainLayout) {
                    mainLayout.innerHTML = customMessage;
                } else {
                    // Si no encuentras .layout, al menos reemplaza el contenido del formulario
                    form.innerHTML = customMessage;
                }
            } else {
                // Maneja errores de n8n (petición no exitosa)
                alert('Ocurrió un error al enviar el brief. Por favor, inténtalo de nuevo.');
                submitButton.textContent = 'Enviar brief';
                submitButton.disabled = false;
            }
        })
        .catch(error => {
            // Maneja errores de red
            console.error('Error de red:', error);
            alert('Ocurrió un error de conexión. Por favor, inténtalo de nuevo.');
            submitButton.textContent = 'Enviar brief';
            submitButton.disabled = false;
        });
    });
});