class MainHandler {
    constructor(pageType) {
        this.pageType = pageType; // Almacena el tipo de página (por ejemplo, 'login', 'services', 'admin').
    }

    // Método para inicializar la funcionalidad según el tipo de página
    initialize() {
        if (this.pageType === 'login') {
            this.initLogin(); // Si la página es 'login', se inicializa la funcionalidad de login.
        } else if (this.pageType === 'services') {
            this.initServices(); // Si la página es 'services', se inicializa la funcionalidad para servicios (acordeones).
        } else if (this.pageType === 'admin') {
            this.initAdminPanel(); // Si es la página del panel de administración, se inicializan las funciones del panel.
        }
    }

    // Funcionalidad específica para la página de login
    initLogin() {
        const form = document.querySelector('.auth-form'); // Selecciona el formulario de autenticación.
        
        // Añade un evento cuando el formulario es enviado
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto (enviar el formulario).
            
            // Obtiene los valores ingresados en los campos de usuario y contraseña
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Si ambos campos están completos, muestra un mensaje de éxito
            if (username && password) {
                alert('Login exitoso.');
                // Aquí iría la lógica para procesar el login.
            } else {
                alert('Por favor, completa todos los campos.'); // Si faltan campos, se muestra una alerta.
            }
        });
    }

    // Funcionalidad específica para la página de servicios (acordeones)
    initServices() {
        const accordions = document.querySelectorAll('.accordion'); // Selecciona todos los elementos con la clase 'accordion'.
        
        // Añade un evento de clic para cada acordeón
        accordions.forEach((accordion) => {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active'); // Activa/desactiva la clase 'active' al hacer clic.

                // Controla la expansión o colapso del contenido del acordeón
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null; // Si está expandido, lo colapsa.
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px"; // Si está colapsado, lo expande.
                }
            });
        });
    }

    // Funcionalidad específica para el panel de administración
    initAdminPanel() {
        const logoutButton = document.querySelector('.logout-button'); // Selecciona el botón de 'Cerrar Sesión'.

        // Añade un evento de clic al botón de cierre de sesión
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto (enviar el formulario o redirigir).
            
            alert('Sesión cerrada.'); // Muestra una alerta simulando el cierre de sesión.
            window.location.href = 'index.html'; // Redirige al usuario a la página de inicio.
        });
    }
}

// Inicializa el MainHandler dependiendo de la página actual
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page; // Obtiene el tipo de página del atributo "data-page".
    const mainHandler = new MainHandler(page); // Crea una nueva instancia de MainHandler con el tipo de página.
    mainHandler.initialize(); // Llama al método initialize para activar la funcionalidad correspondiente.
});