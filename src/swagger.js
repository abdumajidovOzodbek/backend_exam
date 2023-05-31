import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./configure.js";
import { Router } from "express";
const router = Router();

const swaggerDoc = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    info:{
        title:'PRESSA ',
        description:'clone app swagger documentation'
    },
    components:{
        securitySchemes:{
            Bearer: {
                type: 'apiKey',
                name:'token',
                in: 'header'
            }
        }
    }
  },
  apis:[
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`
  ]
});


router.use('/',SwaggerUi.serve,SwaggerUi.setup(swaggerDoc))

export default router