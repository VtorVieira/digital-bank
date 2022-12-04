###### by _[Vitor Vieira](https://www.linkedin.com/in/vtorvieira/)_
# Aplicação Full Stack - Digital-bank

## Resumo BackEnd

Aplicação consiste em uma API que simula transação de transferência, onde é possível fazer login com **username** e **password**, cadastrar novos usuários, visualizar o seu saldo, transferir dinheiro para outros usuários e visualizar o extrato das transações, podendo filtrar por data e tipo de operação (Enviada / Recebida).
A **API** foi desenvolvida em **NodeJS** com **TypeScript**, **Express** e **PostgreSQL**. Possui uma arquitetura **MSC** e ORM **Sequelize**. Também possui autenticação com **JWT** e criptografia com **bcrypt**, e tratamento de erros com **express-async-errors**.

## Resumo FrontEnd

Possui uma interface que consome a API desenvolvida no BackEnd, onde é possível fazer login com e visualizar o saldo, transferir dinheiro para outros usuários e visualizar de transações, podendo filtrar por data e tipo de operação (enviada/recebida).
Foi desenvolvido em **ReactJS** com **TypeScript**. A estilização foi feita com CSS, e **Axios** para fazer as requisições à API.

## ⚙️ Como executar

Você precisa ter instalado as seguintes ferramentas: Git, Docker e Docker Compose

Será necessário que a porta 3000 e 4001 estejam disponíveis para a aplicação, Postgresql usará a porta 5432.

1 - Clone o repositório 
```
git@github.com:VtorVieira/digital-bank.git
```
2 - Entre na pasta `frontend` e execute o comando abaixo:
```
npm i   // para subir a aplicação
```
3 - Entre na pasta `backend` e execute o comando abaixo:
```
npm i   // para subir a aplicação
```
4 - Entre na pasta digital-bank  e suba o dockercompose. Após rodar o comando, aguarde um pouco que a aplicação irá ficar disponivel nas seguintes rotas:

  `- Front End: http://localhost:3000`

  `- Back End: http://localhost:4001`
