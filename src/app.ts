import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/ClienteRoutes';
import contatoRoutes from './routes/ContatoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/contatos', contatoRoutes);

export default app;
