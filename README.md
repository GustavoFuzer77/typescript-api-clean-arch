# API de Autenticação - TypeScript & Clean Architecture

Este projeto é uma API de autenticação desenvolvida em TypeScript, baseada nos princípios da Clean Architecture. O objetivo é fornecer uma solução robusta, modular e escalável, utilizando padrões de design modernos e ferramentas eficientes.

## Tecnologias Utilizadas
 - **TypeScript**: Tipagem estática para maior segurança e manutenção de código.
 - **Clean Architecture** - Organização modular do código em camadas.
 - **Design Patterns** - Aplicação de padrões como Factory, Singleton, Adapter, entre outros.
 - **Fastify** - Framework de backend altamente eficiente e rápido.
 - **PostgreSQL** - Banco de dados relacional, gerenciado via container Docker.
 - **Docker** - Utilizado para executar o PostgreSQL em um ambiente isolado.

## Funcionalidades
 - Registro e autenticação de usuários: Principais funcionalidades da API.
 - Camada de Adapters: Abstração do framework web (Fastify ou outro framework HTTP).
 - Banco de Dados Relacional: Integração com PostgreSQL.
 - Arquitetura extensível, facilitando manutenção e futuras expansões.

## Como Executar o Projeto
 - Pré-requisitos
 - Node.js (v16 ou superior)
 - Docker instalado
 - PostgreSQL

## Como Executar o Projeto
 **Pré-requisitos**
 
 Antes de iniciar o projeto, configure o arquivo .env com as seguintes variáveis:
 
``
DATABASE_URL="postgresql://<usuario>:<senha>@localhost:5432/<nome_db>?schema=public"
JWT_SECRET="escolha_seu_segredo_jwt"
``
**Comandos para Iniciar o Projeto**

Instale as dependências e inicie o projeto com os comandos abaixo (pode substituir npm por yarn, pnpm, bun, etc.):

``
npm install
npm start
``


