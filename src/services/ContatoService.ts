import { query } from '../Database';
import { Contato } from '../models/ContatoModel';

export class ContatoService {
    async getAll() {
        const result = await query('SELECT * FROM contatos');
        return result.rows;
    }

    async getById(id: number) {
        const result = await query('SELECT * FROM contatos WHERE id = $1', [id]);
        return result.rows[0];
    }

    async create(contato: Contato) {
        const result = await query(
            `INSERT INTO contatos (nome_completo, emails, telefones, cliente_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            [contato.nomeCompleto, contato.emails, contato.telefones, contato.clienteId]
        );
        return result.rows[0];
    }

    async update(id: number, contato: Partial<Contato>) {
        const result = await query(
            `UPDATE contatos 
       SET nome_completo = $1, emails = $2, telefones = $3 
       WHERE id = $4 RETURNING *`,
            [contato.nomeCompleto, contato.emails, contato.telefones, id]
        );
        return result.rows[0];
    }

    async delete(id: number) {
        await query('DELETE FROM contatos WHERE id = $1', [id]);
        return { message: 'Contato removido' };
    }
}
