// index.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import imageRouter from './src/Routes/imageRoutes.js'; // New: Import image routes
import helloRouter from './src/hello.js';

dotenv.config(); // Load environment variables first

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

const app = express();
const PORT = process.env.PORT || 2001;

app.use(express.json()); // Use built-in JSON parser
app.use(morgan('dev'));
app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jewellery Bot APIs',
      version: '1.0.0',
      description: 'APIs with image processing',
      // termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'http://prodevmanish.vercel.app/',
        email: 'manishsit13@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
        description: 'API Documentation',
      },
    ],
  },
  // Updated to include controller files
  apis: ['src/Routes/*.js', 'src/controllers/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

app.use('/', helloRouter);
app.use('/image', imageRouter); // New: Mount image routes

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));