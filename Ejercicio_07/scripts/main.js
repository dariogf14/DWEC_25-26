document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---

    const outerBOX = document.querySelector('#outer-box');
    outerBOX.addEventListener('click', function(event) {
        console.log("target:", event.target.id);
        console.log("current target:", event.currentTarget.id);
        if (event.target === event.currentTarget) { return; }
        event.target.style.backgroundColor = "coral";
    });

    const middleBox = document.querySelector('#middle-box');
    middleBox.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Evento detenido en middle-box');
        middleBox.style.backgroundColor = 'lightgreen';
    });

    // --- Solución Ejercicio 2 ---

    const testLink = document.getElementById('test-link');
    testLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Navegación prevenida');
    });

    // --- Solución Ejercicio 3 ---

    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Solución Ejercicio 5 ---

    const notificationBtn = document.getElementById('notification-btn');
    const notificationArea = document.getElementById('notification-area');

    notificationBtn.addEventListener('click', () => {
        const customEvent = new CustomEvent('notification', {
            detail: {
                mensaje: 'Notificación recibida',
                fecha: new Date().toLocaleString()
            }
        });
        document.body.dispatchEvent(customEvent);
    });

    document.body.addEventListener('notification', (event) => {
        const { mensaje, fecha } = event.detail;
        notificationArea.innerHTML = `<p>${mensaje}</p><p><small>${fecha}</small></p>`;
    });

});