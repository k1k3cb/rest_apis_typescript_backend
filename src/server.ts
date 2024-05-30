import colors from 'colors';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import swaggerUI from 'swagger-ui-express';
import db from './config/db';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import morgan from 'morgan';

//conexion base de datos

export const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgGreen.bold('Conexion exitosa a la BD'));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold('Error al conectar a la base de datos'));
  }
};

connectDB();

//Instacia de Express
const server: Express = express();

//Permitir peticiones CORS
const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    if (origin=== process.env.FRONTEND_URL) {
      callback(null, true)
     
    }else{
      callback(new Error('Error de CORS'))
    }
  },
  
};

server.use(cors(corsOptions));


//Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

//Documentacion de la API
server.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
