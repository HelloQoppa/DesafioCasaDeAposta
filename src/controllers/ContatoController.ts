import { Request, Response } from 'express';
import { ContatoService } from '../services/ContatoService';

const contatoService = new ContatoService();

export const getContatos = async (req: Request, res: Response) => {
    const contatos = await contatoService.getAll();
    res.json(contatos);
};

export const getContatoById = async (req: Request, res: Response) => {
    const contato = await contatoService.getById(+req.params.id);
    res.json(contato);
};

export const createContato = async (req: Request, res: Response) => {
    const contato = await contatoService.create(req.body);
    res.json(contato);
};

export const updateContato = async (req: Request, res: Response) => {
    const contato = await contatoService.update(+req.params.id, req.body);
    res.json(contato);
};

export const deleteContato = async (req: Request, res: Response) => {
    await contatoService.delete(+req.params.id);
    res.json({ message: 'Contato removido' });
};
