import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    tags: [
      {
        name: 'Products',
        description: 'API operations for Products'
      }
    ],
    info: {
      title: 'REST API with Express and TypeScript',
      version: '1.0.0',
      description: 'Example docs'
    }
  },
  apis: ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
  
  .swagger-ui .topbar {
    background-color: #2b3b45;
  }
  `,
  customSiteTitle: 'REST API with Express and TypeScript',
};


export default swaggerSpec;
export { swaggerUiOptions };
