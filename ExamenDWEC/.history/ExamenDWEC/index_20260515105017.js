import 'dotenv/config';              
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


import { errorHandler, notFound } from './middleware/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 8080;