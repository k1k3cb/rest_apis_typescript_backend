import { exit } from 'process';
import db from '../config/db';

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log('Base de datos reiniciada');
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === '--clear') clearDB();
console.log(process.argv);
