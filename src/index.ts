import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import postRoutes from './routes/postRoutes';
import dotenv from 'dotenv';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan rute
app.use('/api', postRoutes);

// Middleware error global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Inisialisasi koneksi database
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'olil',
  password: '007177',
  database: 'blogging_platform',
  entities: ['src/entities/**/*.ts'],
  synchronize: true,
  logging: false,
})
  .then(() => {
    // Jalankan server setelah koneksi berhasil
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });

export default app;