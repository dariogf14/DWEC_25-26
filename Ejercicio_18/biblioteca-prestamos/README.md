# Biblioteca - Préstamos

Aplicación Node.js + Express + MySQL para gestionar libros y préstamos de una biblioteca.

## Funcionalidades

- Catálogo principal `/`
- Vista de libros prestados `/prestados`
- Préstamos activos por usuario `/prestamos/usuario?nombre=Ana%20García`
- Detalle de libro `/libro/:id`
- Formulario para prestar libro `/prestamo/formulario/:libro_id`
- Acción para crear préstamo `POST /prestamo/nuevo`
- Acción para registrar devolución `/prestamo/devolver/:libro_id`
- Vista de libros vencidos `/vencidos`
- Logging con Morgan
- CSS desde `/public`
- Patrón MVC

## Base de datos

Ejecutar en MySQL:

```sql
SOURCE sql/schema.sql;
SOURCE sql/seed.sql;
```

O copiar y pegar el contenido de esos dos archivos en MySQL Workbench.

## Variables de entorno

Crear un archivo `.env` a partir de `.env.example`:

```env
DB_HOST=tu-endpoint-rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=tu_password
DB_NAME=biblioteca
DB_PORT=3306
```

## Ejecutar en local

```bash
npm install
npm start
```

Abrir:

```txt
http://localhost:3000
```

## Vercel

Subir a GitHub, importar el repositorio en Vercel y añadir las variables de entorno:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

La URL pública será similar a:

```txt
https://biblioteca-prestamos.vercel.app
```
