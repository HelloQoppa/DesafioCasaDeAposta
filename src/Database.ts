import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
