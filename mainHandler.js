class MainHandler {
    constructor(pageType) {
        this.pageType = pageType;
    }

    initialize() {
        if (this.pageType === 'login') {
            this.initLogin();
        } else if (this.pageType === 'services') {
            this.initServices();
        }
    }

    // Funcionalidad para la página de login
    initLogin() {
        const form = document.querySelector('.auth-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                alert('Login exitoso.');
                // Lógica para procesar el login aquí
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Funcionalidad para la página de servicios
    initServices() {
        const accordions = document.querySelectorAll('.accordion');
        
        accordions.forEach((accordion) => {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active');
                
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }
}

// Inicializar el MainHandler dependiendo de la página actual
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page; // Obtenemos el tipo de página del atributo "data-page"
    const mainHandler = new MainHandler(page);
    mainHandler.initialize();
});