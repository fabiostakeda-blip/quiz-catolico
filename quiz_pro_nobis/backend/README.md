
# Backend - Quiz Pro Nobis

Este diretório contém o código-fonte do backend da aplicação Quiz Pro Nobis, desenvolvido em Flask.

## Estrutura de Arquivos

- `app.py`: Ponto de entrada principal da aplicação Flask, contendo as rotas da API e a lógica de negócio.
- `questions.json`: Arquivo JSON contendo as perguntas do quiz, referências do Catecismo e metadados.
- `auth.py`: Módulo para lidar com a autenticação de usuários (login/logout).
- `config.py`: Configurações da aplicação (chaves secretas, etc.).

## Rotas da API

- `GET /questions`: Retorna todas as perguntas do quiz.
- `POST /login`: Autentica um usuário e retorna um token de sessão.
- `POST /logout`: Invalida a sessão do usuário.

## Dependências

- Flask
- Flask-CORS (para permitir requisições do frontend)

## Como Executar

1. Instale as dependências:
   `pip install -r requirements.txt`
2. Execute a aplicação:
   `python app.py`


