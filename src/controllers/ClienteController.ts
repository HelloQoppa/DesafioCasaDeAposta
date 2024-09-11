import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';

const clienteService = new ClienteService();

export const getClientes = async (req: Request, res: Response) => {
    const clientes = await clienteService.getAll();
    res.json(clientes);
};

export const getClienteById = async (req: Request, res: Response) => {
    const cliente = await clienteService.getById(+req.params.id);
    res.json(cliente);
};

export const createCliente = async (req: Request, res: Response) => {
    const cliente = await clienteService.create(req.body);
    res.json(cliente);
};

export const updateCliente = async (req: Request, res: Response) => {
    const cliente = await clienteService.update(+req.params.id, req.body);
    res.json(cliente);
};

export const deleteCliente = async (req: Request, res: Response) => {
    await clienteService.delete(+req.params.id);
    res.json({ message: 'Cliente removido' });
};
