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

            if (username && password) {
                // Usar fetch para enviar los datos al servidor
                fetch('login.php', {
                    method: 'POST',  // Método POST para enviar los datos
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({  // Enviar los datos del formulario
                        username: username,
                        password: password
                    })
                })
                .then(response => response.text())  // Procesar la respuesta
                .then(data => {
                    alert(data);  // Mostrar el mensaje devuelto por el servidor
                })
                .catch(error => console.error('Error:', error));  // Manejar errores
            } else {
                alert('Por favor, completa todos los campos.');  // Si faltan campos, mostrar alerta
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

     // Inicializar funcionalidad del registro
     initRegister() {
        const form = document.querySelector('.auth-form');  // Selecciona el formulario de registro

        form.addEventListener('submit', (e) => {
            e.preventDefault();  // Previene que el formulario recargue la página

            const name = document.getElementById('name').value;      // Obtener el valor del campo nombre
            const email = document.getElementById('email').value;    // Obtener el valor del campo email
            const password = document.getElementById('password').value;  // Obtener el valor del campo contraseña

            if (name && email && password) {
                // Usar fetch para enviar los datos al servidor
                fetch('register.php', {
                    method: 'POST',  // Método POST para enviar los datos
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({  // Enviar los datos del formulario
                        name: name,
                        email: email,
                        password: password
                    })
                })
                .then(response => response.text())  // Procesar la respuesta
                .then(data => {
                    alert(data);  // Mostrar el mensaje devuelto por el servidor
                })
                .catch(error => console.error('Error:', error));  // Manejar errores
            } else {
                alert('Por favor, completa todos los campos.');  // Si faltan campos, mostrar alerta
            }
        });
    }
}

    // Funcionalidad específica para el panel de administración
    initAdminPanel() 
        const logoutButton = document.querySelector('.logout-button'); // Selecciona el botón de 'Cerrar Sesión'.

        // Añade un evento de clic al botón de cierre de sesión
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto (enviar el formulario o redirigir).
            
            alert('Sesión cerrada.'); // Muestra una alerta simulando el cierre de sesión.
            window.location.href = 'index.html'; // Redirige al usuario a la página de inicio.
        });
    


// Inicializa el MainHandler dependiendo de la página actual
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page; // Obtiene el tipo de página del atributo "data-page".
    const mainHandler = new MainHandler(page); // Crea una nueva instancia de MainHandler con el tipo de página.
    mainHandler.initialize(); // Llama al método initialize para activar la funcionalidad correspondiente.
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene el envío por defecto

    const formData = new FormData(form); // Captura los datos del formulario

    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Muestra el resultado del registro
    })
    .catch(error => console.error('Error:', error));
});