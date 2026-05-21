import 'dotenv/config';              
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


import { errorHandler, notFound } from './middleware/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => res.redirect('/dashboard'));
app.use(notFound); 
app.use(errorHandler);  

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

export default app;