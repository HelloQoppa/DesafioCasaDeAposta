import { Router } from 'express';
import { getContatos, getContatoById, createContato, updateContato, deleteContato } from '../controllers/ContatoController';

const router = Router();

router.get('/', getContatos);
router.get('/:id', getContatoById);
router.post('/', createContato);
router.put('/:id', updateContato);
router.delete('/:id', deleteContato);

export default router;
