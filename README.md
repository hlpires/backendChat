 Chat Backend

Este repositório contém o backend de um sistema de chat em tempo real. Utilizando **Node.js**, **Socket.io** e **MongoDB**, a aplicação permite o envio e recebimento de mensagens instantâneas entre usuários, com persistência de dados no banco de dados MongoDB.

## Funcionalidades

- **Conexão em Tempo Real**: Comunicação em tempo real entre o servidor e os clientes utilizando WebSockets com **Socket.io**.
- **Persistência de Mensagens**: As mensagens enviadas são armazenadas no **MongoDB**.
- **Armazenamento de Mensagens**: Histórico completo de mensagens armazenado no banco de dados, permitindo a recuperação de mensagens anteriores quando os usuários se conectam.
- **API REST**: Endpoint para verificar o status do servidor.

## Arquitetura

- **Node.js**: Utilizado como ambiente de execução do servidor backend.
- **Express**: Framework para criar o servidor HTTP.
- **Socket.io**: Biblioteca para comunicação bidirecional em tempo real, implementando WebSockets.
- **MongoDB**: Banco de dados NoSQL para armazenar mensagens. A aplicação se conecta ao MongoDB Atlas para persistência de dados.

## Estrutura de Dados

O backend utiliza um **schema MongoDB** para as mensagens, que possui os seguintes campos:

- `user`: String, nome do usuário que enviou a mensagem.
- `message`: String, conteúdo da mensagem.
- `timestamp`: Data, hora do envio da mensagem (padrão: hora atual).

As mensagens são salvas no banco de dados assim que são enviadas e podem ser recuperadas para exibição quando um usuário se conecta.