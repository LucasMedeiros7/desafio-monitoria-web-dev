## Desafio Resilia Educação - Backend e-commerce.
Sistema de gerenciamento de produtos e categorias.

### [Description of challenge](https://github.com/Impact-Plataform/Banco-de-talentos/blob/main/backend/readme.md)

## Tecnologias:
O projeto foi desenvolvido utilizando as seguintes tecnologias:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Vitest](https://vitest.dev/)
- [Swagger](https://swagger.io/)
- [Prisma](https://www.prisma.io/)

## Requisitos para rodar a aplicação:
- Git Instalado
- Node.js LTS Instalado
- Docker Instalado
- Banco de dados compativel com o Prisma (Postrgres, Mysql, SQLite)

## Rodando o projeto
Para rodar o projeto basta seguir os passos abaixo:
```bash
# Instale as dependencias:
$ npm install

# Suba o banco de dados com docker:
$ docker-compose up -d

# Mude o nome do ".env.example" para ".env" e defina as configurações de sua preferência.
# Caso opte pela não utilização do docker, redefine as configurações do banco de acordo com o que for utilizar no ".env".

# Rode as migrations no banco de dados:
$ npm run migrate:dev

# Start no servidor:
$ npm run dev
```
A api estará rodando em http://localhost:3000.

## Rodando os testes
Para rodar os testes basta estar conectado com o banco de dados e rodar o comando abaixo:
```bash
$ npm test
```

## Documentação:
Você pode utilizar todas as rotas da api, com uma documentação detalhada utilizando swaggerUI em http://localhost:3000/docs.
