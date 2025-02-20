import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config/index.js';
import bigqueryRoutes from './routes/bigqueryRoutes.js';
import { logger } from './middlewares/logger.js';

const app = express();
const port = config.port;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json());
app.use(logger);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BigQuery API',
      version: '1.0.0',
      description: 'API to fetch data from BigQuery',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ['./controllers/bigqueryController.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', bigqueryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
