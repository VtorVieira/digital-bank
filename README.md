# Aplicação Full Stack - Digital-bank

## Resumo BackEnd

Aplicação consiste em uma API que simula transação de transferência, onde é possível fazer login com **username** e **password**, cadastrar novos usuários, visualizar o seu saldo, transferir dinheiro para outros usuários e visualizar o extrato das transações, podendo filtrar por data e tipo de operação (Enviada / Recebida).
A **API** foi desenvolvida em **NodeJS** com **TypeScript**, **Express** e **PostgreSQL**. Possui uma arquitetura **MSC** e ORM **Sequelize**. Também possui autenticação com **JWT** e criptografia com **bcrypt**, e tratamento de erros com **express-async-errors**.

## Resumo FrontEnd

Possui uma interface que consome a API desenvolvida no BackEnd, onde é possível fazer login com e visualizar o saldo, transferir dinheiro para outros usuários e visualizar de transações, podendo filtrar por data e tipo de operação (enviada/recebida).
Foi desenvolvido em **ReactJS** com **TypeScript**. A estilização foi feita com CSS, e **Axios** para fazer as requisições à API.

# **Instruções**

Portas utilizadas: Banco de Dados: 5432, BackEnd: 4001, FrontEnd: 3000

### **Instalação e Execução**

As instruções a seguir são para execução utilizando Docker.

Após clonar o repositório, acessar a pasta **app** e executar o comando **docker-compose up -d**, após alguns segundos até a aplicação baixar todas as depedências e a pagina poderá ser acessada através do link http://localhost:3000/.
