import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
// process.loadEnvFile('./.env.local');
dotenv.config({ path: './.env.local' });

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

export default db;
