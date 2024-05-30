import db from '../config/db';
import { connectDB } from '../server';

jest.mock('../config/db');

describe('connectDB', () => {
  test(' should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Error al conectar a la base de datos'));
    const consoleSpy = jest.spyOn(console, 'log');
    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error al conectar a la base de datos')
    );
  });
});
