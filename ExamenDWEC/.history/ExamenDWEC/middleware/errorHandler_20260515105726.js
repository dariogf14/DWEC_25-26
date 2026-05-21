export function notFound(req, res, next) {
    const error = new Error(`No encontrado: ${req.originalUrl}`);
    error.status = 404;
    next(error); 
}


export function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    const mensaje    = err.message || 'Error interno del servidor';

    console.error(`[ERROR ${statusCode}] ${req.method} ${req.url} →`, mensaje);

    res.status(statusCode).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Error ${statusCode}</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <nav class="nav">
                <a href="/">🔧 Taller Mecánico</a>
                <a href="/dashboard">Dashboard</a>
            </nav>
            <div class="container">
                <div class="card" style="text-align:center; padding: 3rem;">
                    <h1 style="font-size:5rem; color:#e74c3c; margin:0">${statusCode}</h1>
                    <h2>${statusCode === 404 ? 'Página no encontrada' : 'Error del servidor'}</h2>
                    <p>${mensaje}</p>
                    <a href="/" class="btn">← Volver al inicio</a>
                </div>
            </div>
        </body>
        </html>
    `);
}