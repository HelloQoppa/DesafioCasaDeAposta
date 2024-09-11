document.addEventListener('DOMContentLoaded', () => {
    const loadClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/clientes');
            const clientes = await response.json();

            const clientesTableBody = document.getElementById('clientesTableBody');
            clientesTableBody.innerHTML = '';

            clientes.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome_completo}</td>
                <td>${cliente.emails.join(', ')}</td>
                <td>${cliente.telefones.join(', ')}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="verCliente(${cliente.id})">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editarCliente(${cliente.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirCliente(${cliente.id})">Excluir</button>
                </td>
                `;
                clientesTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    };

    const loadContatos = async () => {
        try {
            const response = await fetch('http://localhost:3000/contatos');
            const contatos = await response.json();

            const contatosTableBody = document.getElementById('contatosTableBody');
            contatosTableBody.innerHTML = '';

            contatos.forEach(contato => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${contato.id}</td>
                <td>${contato.nome_completo}</td>
                <td>${contato.emails.join(', ')}</td>
                <td>${contato.telefones.join(', ')}</td>
                <td>${contato.cliente_id}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="verContato(${contato.id})">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editarContato(${contato.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirContato(${contato.id})">Excluir</button>
                </td>
                `;
                contatosTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar contatos:', error);
        }
    };

    // Função para adicionar cliente
    document.getElementById('createClientForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const emails = document.getElementById('emails').value.split(',');
        const telefones = document.getElementById('telefones').value.split(',');

        try {
            await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomeCompleto, emails, telefones })
            });
            const modal = bootstrap.Modal.getInstance(document.getElementById('createClientModal'));
            modal.hide();
            loadClientes();
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
        }
    });

    // Função para ver cliente
    window.verCliente = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/clientes/${id}`);
            const cliente = await response.json();

            document.getElementById('viewClientId').textContent = cliente.id;
            document.getElementById('viewNomeCompleto').textContent = cliente.nome_completo;
            document.getElementById('viewEmails').textContent = cliente.emails.join(', ');
            document.getElementById('viewTelefones').textContent = cliente.telefones.join(', ');

            const modal = new bootstrap.Modal(document.getElementById('viewClientModal'));
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar cliente:', error);
        }
    };

    // Função para editar cliente
    window.editarCliente = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/clientes/${id}`);
            const cliente = await response.json();

            document.getElementById('editClientId').value = cliente.id;
            document.getElementById('editNomeCompleto').value = cliente.nome_completo;
            document.getElementById('editEmails').value = cliente.emails.join(', ');
            document.getElementById('editTelefones').value = cliente.telefones.join(', ');

            const modal = new bootstrap.Modal(document.getElementById('editClientModal'));
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar cliente para edição:', error);
        }
    };

    // Função para salvar alterações de cliente
    document.getElementById('editClientForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('editClientId').value;
        const nomeCompleto = document.getElementById('editNomeCompleto').value;
        const emails = document.getElementById('editEmails').value.split(',');
        const telefones = document.getElementById('editTelefones').value.split(',');

        try {
            await fetch(`http://localhost:3000/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomeCompleto, emails, telefones })
            });
            const modal = bootstrap.Modal.getInstance(document.getElementById('editClientModal'));
            modal.hide();
            loadClientes();
        } catch (error) {
            console.error('Erro ao salvar alterações do cliente:', error);
        }
    });

    // Função para excluir cliente
    window.excluirCliente = async (id) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await fetch(`http://localhost:3000/clientes/${id}`, {
                    method: 'DELETE'
                });
                loadClientes();
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
            }
        }
    };

    // Função para adicionar contato
    document.getElementById('createContactForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const emails = document.getElementById('emails').value.split(',');
        const telefones = document.getElementById('telefones').value.split(',');
        const clienteId = document.getElementById('clienteId').value;

        try {
            await fetch('http://localhost:3000/contatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomeCompleto, emails, telefones, clienteId })
            });
            const modal = bootstrap.Modal.getInstance(document.getElementById('createContactModal'));
            modal.hide();
            loadContatos();
        } catch (error) {
            console.error('Erro ao adicionar contato:', error);
        }
    });

    // Função para ver contato
    window.verContato = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/contatos/${id}`);
            const contato = await response.json();

            document.getElementById('viewContactId').textContent = contato.id;
            document.getElementById('viewNomeCompleto').textContent = contato.nome_completo;
            document.getElementById('viewEmails').textContent = contato.emails.join(', ');
            document.getElementById('viewTelefones').textContent = contato.telefones.join(', ');
            document.getElementById('viewClienteId').textContent = contato.cliente_id;

            const modal = new bootstrap.Modal(document.getElementById('viewContactModal'));
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar contato:', error);
        }
    };

    // Função para editar contato
    window.editarContato = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/contatos/${id}`);
            const contato = await response.json();

            document.getElementById('editContactId').value = contato.id;
            document.getElementById('editNomeCompleto').value = contato.nome_completo;
            document.getElementById('editEmails').value = contato.emails.join(', ');
            document.getElementById('editTelefones').value = contato.telefones.join(', ');
            document.getElementById('editClienteId').value = contato.cliente_id;

            const modal = new bootstrap.Modal(document.getElementById('editContactModal'));
            modal.show();
        } catch (error) {
            console.error('Erro ao carregar contato para edição:', error);
        }
    };

    // Função para salvar alterações de contato
    document.getElementById('editContactForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('editContactId').value;
        const nomeCompleto = document.getElementById('editNomeCompleto').value;
        const emails = document.getElementById('editEmails').value.split(',');
        const telefones = document.getElementById('editTelefones').value.split(',');
        const clienteId = document.getElementById('editClienteId').value;

        try {
            await fetch(`http://localhost:3000/contatos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomeCompleto, emails, telefones, clienteId })
            });
            const modal = bootstrap.Modal.getInstance(document.getElementById('editContactModal'));
            modal.hide();
            loadContatos();
        } catch (error) {
            console.error('Erro ao salvar alterações do contato:', error);
        }
    });

    // Função para excluir contato
    window.excluirContato = async (id) => {
        if (confirm('Tem certeza que deseja excluir este contato?')) {
            try {
                await fetch(`http://localhost:3000/contatos/${id}`, {
                    method: 'DELETE'
                });
                loadContatos();
            } catch (error) {
                console.error('Erro ao excluir contato:', error);
            }
        }
    };

    loadClientes();
    loadContatos();
});