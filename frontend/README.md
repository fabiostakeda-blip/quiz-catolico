
# Frontend - Quiz Pro Nobis

Este diretório contém o código-fonte do frontend da aplicação Quiz Pro Nobis, desenvolvido em React.

## Estrutura de Arquivos

- `src/App.js`: Componente principal da aplicação.
- `src/components/`: Diretório para componentes reutilizáveis (e.g., `QuestionCard.js`, `Login.js`).
- `src/pages/`: Diretório para as páginas principais da aplicação (e.g., `QuizPage.js`, `LoginPage.js`).
- `src/services/api.js`: Módulo para interagir com o backend da API.
- `src/context/AuthContext.js`: Contexto para gerenciar o estado de autenticação do usuário.
- `src/utils/localStorage.js`: Funções para gerenciar o armazenamento local (LocalStorage).

## Componentes Principais

- **Login**: Componente para autenticação de usuários.
- **QuestionCard**: Exibe uma pergunta do quiz e permite a interação com a resposta.
- **QuizPage**: Gerencia o fluxo do quiz, exibe as perguntas e o progresso.
- **ProgressBar**: Componente visual para o progresso do usuário.

## Dependências

- React
- React Router (para navegação entre páginas)
- Axios (para requisições HTTP)

## Como Executar

1. Instale as dependências:
   `npm install` ou `yarn install`
2. Execute a aplicação:
   `npm start` ou `yarn start`


