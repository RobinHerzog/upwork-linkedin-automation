import * as swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('src/app/middlewares/swagger/swagger.yaml');


export default (app: Application) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};
