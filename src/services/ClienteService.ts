import { query } from '../Database';
import { Cliente } from '../models/ClienteModel';

export class ClienteService {
    async getAll() {
        const result = await query('SELECT * FROM clientes');
        return result.rows;
    }

    async getById(id: number) {
        const result = await query('SELECT * FROM clientes WHERE id = $1', [id]);
        return result.rows[0];
    }

    async create(cliente: Cliente) {
        const result = await query(
            `INSERT INTO clientes (nome_completo, emails, telefones, data_registro) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            [cliente.nomeCompleto, cliente.emails, cliente.telefones, new Date()]
        );
        return result.rows[0];
    }

    async update(id: number, cliente: Partial<Cliente>) {
        const result = await query(
            `UPDATE clientes 
       SET nome_completo = $1, emails = $2, telefones = $3 
       WHERE id = $4 RETURNING *`,
            [cliente.nomeCompleto, cliente.emails, cliente.telefones, id]
        );
        return result.rows[0];
    }

    async delete(id: number) {
        await query('DELETE FROM clientes WHERE id = $1', [id]);
        return { message: 'Cliente removido' };
    }
}
