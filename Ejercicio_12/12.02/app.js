const formulario = document.getElementById("formBusqueda");
const emailInput = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const resultados = document.getElementById("resultados");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    mensaje.textContent = "";
    resultados.innerHTML = "";

    const email = emailInput.value.trim();

    if (email === "" || !email.includes("@")) {
        mensaje.textContent = "Introduce un email válido.";
        return;
    }

    mensaje.textContent = "Buscando...";

    try {
        const datos = await buscarUsuarioYPedidos(email);
        mensaje.textContent = "";
        mostrarResultados(datos);

    } catch (error) {
        mensaje.textContent = error.message;
    }
});

async function buscarUsuarioYPedidos(email) {
    const resUsuarios = await fetch("./data/usuarios.json");
    const usuarios = await resUsuarios.json();

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const resPedidos = await fetch("./data/pedidos.json");
    const pedidos = await resPedidos.json();

    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuario.id);

    return {
        usuario,
        pedidos: pedidosUsuario
    };
}

function mostrarResultados({ usuario, pedidos }) {
    resultados.innerHTML = `
        <div class="usuario">
            <h2>Usuario encontrado</h2>
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Fecha de registro:</strong> ${usuario.registro}</p>
        </div>
    `;

    if (pedidos.length === 0) {
        resultados.innerHTML += `<p>Este usuario no tiene pedidos registrados.</p>`;
        return;
    }

    resultados.innerHTML += `<h3>Pedidos del Usuario:</h3>`;

    pedidos.forEach(ped => {
        resultados.innerHTML += `
            <div class="pedido">
                <p><strong>ID Pedido:</strong> ${ped.id}</p>
                <p><strong>Fecha:</strong> ${ped.fecha}</p>
                <p><strong>Estado:</strong> ${ped.estado}</p>
            </div>
        `;
    });
}