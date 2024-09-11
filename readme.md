# Projeto CRUD Clientes e Contatos

Este projeto implementa um sistema de gerenciamento de clientes e seus contatos, utilizando **Node.js** com **TypeScript** para o backend e **HTML**, **CSS**, **Bootstrap** para o frontend. O banco de dados utilizado é o **PostgreSQL**.

- **Node.js** (Plataforma)
- **NPM** (para gerenciar pacotes)
- **PostgreSQL** (Banco de dados)
- **Docker** (PostgreSQL via container)

---

## Configuração do Banco de Dados

1. **Criar o banco de dados no PostgreSQL**:

   ```sql
   CREATE DATABASE clientes_contatos;
    
    -- Tabela de Clientes
    CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    emails TEXT[] NOT NULL,
    telefones TEXT[] NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
            
    -- Tabela de Contatos
    CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    emails TEXT[] NOT NULL,
    telefones TEXT[] NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
    );
    ```

2. **Configurar as credenciais no arquivo .env**:
        
        DATABASE_URL = {
        USUARIO = SEU-USUARIO;
        SENHA = SUA-SENHA;
        5432 = Porta Padão Postgres;
        desafioCasaDeApostas = Nome do Banco;
        }
        
        **DATABASE_URL=postgres://SEU-USUARIO:SUA-SENHA@localhost:5432/desafioCasaDeApostas**

        PORT = 3000



3. **Instalação e Execução**:
        
      #### Backend:

        1. Clone o repositório
        2. Instale as dependências:
            npm install
        3. Para rodar o backend, script 'start' no arquivo package.json:
            npm run start

     #### Frontend:

        1. Navegue para o diretório frontend:
            cd frontend

        2. Instale o http-server:
            npm install -g http-server
         
        3. Inicie o servidor para o frontend:
            http-server -p 
            
# Resumo das Rotas

## Clientes

```http
POST /clientes: Cria um novo cliente
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome_completo` | `string` | **Obrigatório**. O nome completo do cliente|
| `emails` | `string[]` | **Obrigatório**. Lista de emails do cliente|
| `telefones` | `string[]` | **Obrigatório**. Lista de telefones do cliente|


```http
GET /clientes: Lista todos os clientes
```

```http
GET /clientes/:id: Exibe um cliente específico
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|

```http
PUT /clientes/:id: Atualiza um cliente existente
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|
| `nome_completo` | `string` | **Obrigatório**. O nome completo do cliente|
| `emails` | `string[]` | **Obrigatório**. Lista de emails do cliente|
| `telefones` | `string[]` | **Obrigatório**. Lista de telefones do cliente|

```http
DELETE /clientes/:id: Remove um cliente
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|

## Contatos
```http
POST /contatos: Cria um novo contato para um cliente
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|`cliente_id`	| `integer`	| **Obrigatório**. O ID do cliente
| `nome_completo` | `string` | **Obrigatório**. O nome completo do cliente|
| `emails` | `string[]` | **Obrigatório**. Lista de emails do cliente|
| `telefones` | `string[]` | **Obrigatório**. Lista de telefones do cliente|

```http
GET /contatos: Lista todos os contatos
```
```http
GET /contatos/:id: Exibe um contato específico
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|

```http
PUT /contatos/:id: Atualiza um contato existente
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|
| `nome_completo` | `string` | **Opcional**. O nome completo do contato|
| `emails` | `string[]` | **Opcional**. Lista de emails do contato|
| `telefones` | `string[]` | **Opcional**. Lista de telefones do contato|

```http
DELETE /contatos/:id: Remove um contato
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `integer` | **Obrigatório**. O ID do cliente que você quer|
