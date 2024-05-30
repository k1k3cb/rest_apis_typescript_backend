import { Sequelize } from 'sequelize-typescript';

process.loadEnvFile('./.env.local');

const db = new Sequelize(process.env.DATABASE_URL,{
    models: [__dirname + '/../models/**/*'],
    logging: false
});

export default db;
