# Quiz Pro Nobis - Aplicativo de Quiz Católico

## Descrição

O Quiz Pro Nobis é um aplicativo web completo desenvolvido para auxiliar no aprofundamento do conhecimento da fé católica. O aplicativo apresenta 20 perguntas cuidadosamente elaboradas baseadas no Catecismo da Igreja Católica, organizadas em 4 categorias principais seguindo a estrutura do Catecismo.

## Características Principais

### 🎯 Funcionalidades
- **Sistema de Login**: Autenticação básica com contas de teste
- **Interface de Flashcards**: Perguntas apresentadas em formato de cartões interativos
- **Categorização**: Perguntas organizadas por partes do Catecismo
- **Níveis de Dificuldade**: Perguntas classificadas como básico e intermediário
- **Progresso do Usuário**: Acompanhamento visual do progresso por categoria
- **Design Responsivo**: Interface adaptável para desktop e mobile

### 📚 Categorias do Quiz
1. **A Profissão da Fé** (Parte I) - 5 perguntas
2. **A Celebração do Mistério Cristão** (Parte II) - 5 perguntas
3. **A Vida em Cristo** (Parte III) - 5 perguntas
4. **A Oração Cristã** (Parte IV) - 5 perguntas

### 🎨 Design e Interface
- Interface moderna com gradientes suaves
- Componentes UI profissionais usando shadcn/ui
- Ícones Lucide para melhor experiência visual
- Animações e transições suaves
- Paleta de cores inspirada em temas católicos

## Estrutura do Projeto

```
quiz_pro_nobis/
├── backend/
│   └── quiz_pro_nobis_backend/
│       ├── src/
│       │   ├── main.py              # Aplicação Flask principal
│       │   ├── questions.json       # Base de dados das perguntas
│       │   └── routes/
│       │       └── quiz.py          # Rotas da API do quiz
│       ├── venv/                    # Ambiente virtual Python
│       └── requirements.txt         # Dependências Python
└── frontend/
    └── quiz-pro-nobis-frontend/
        ├── src/
        │   ├── App.jsx              # Componente principal
        │   ├── components/
        │   │   ├── Login.jsx        # Componente de login
        │   │   ├── QuizDashboard.jsx # Dashboard principal
        │   │   └── QuestionCard.jsx  # Cartão de pergunta
        │   └── components/ui/       # Componentes UI (shadcn/ui)
        ├── package.json             # Dependências Node.js
        └── vite.config.js           # Configuração do Vite
```

## Tecnologias Utilizadas

### Backend
- **Flask**: Framework web Python
- **Flask-CORS**: Suporte a requisições cross-origin
- **SQLAlchemy**: ORM para banco de dados (configurado mas não utilizado)
- **Werkzeug**: Utilitários para hash de senhas

### Frontend
- **React**: Biblioteca JavaScript para interface
- **Vite**: Build tool e servidor de desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI profissionais
- **Lucide React**: Ícones modernos
- **Framer Motion**: Animações (pré-instalado)

## Como Executar o Projeto

### Pré-requisitos
- Python 3.11+
- Node.js 20+
- pnpm (gerenciador de pacotes)

### Executando o Backend

1. Navegue até o diretório do backend:
```bash
cd quiz_pro_nobis/backend/quiz_pro_nobis_backend
```

2. Ative o ambiente virtual:
```bash
source venv/bin/activate
```

3. Execute o servidor Flask:
```bash
python src/main.py
```

O backend estará disponível em `http://localhost:5000`

### Executando o Frontend

1. Navegue até o diretório do frontend:
```bash
cd quiz_pro_nobis/frontend/quiz-pro-nobis-frontend
```

2. Execute o servidor de desenvolvimento:
```bash
pnpm run dev --host
```

O frontend estará disponível em `http://localhost:5173`

## Contas de Teste

O aplicativo inclui duas contas de teste pré-configuradas:

- **Administrador**: 
  - Email: `admin@example.com`
  - Senha: `admin123`

- **Usuário**: 
  - Email: `user@example.com`
  - Senha: `user123`

## API Endpoints

### Autenticação
- `POST /api/login` - Fazer login
- `POST /api/logout` - Fazer logout
- `GET /api/user` - Obter usuário atual

### Quiz
- `GET /api/questions` - Obter todas as perguntas
- `GET /api/questions/<id>` - Obter pergunta específica
- `GET /api/categories` - Obter categorias disponíveis

## Estrutura das Perguntas

Cada pergunta segue o formato JSON especificado no prompt original:

```json
{
  "question_id": "q001_profissao_fe",
  "question": "Qual é a principal fonte da Revelação Divina para a Igreja Católica?",
  "catechism_reference_suggestion": "CIC §50-53",
  "difficulty": "basic",
  "category": "A Profissão da Fé",
  "part_section": "Parte I",
  "answer": "",
  "author_style": "",
  "citation": "",
  "citation_source": "",
  "final_catechism_reference": ""
}
```

## Funcionalidades Implementadas

### ✅ Concluído
- [x] Sistema de autenticação básico
- [x] Interface de flashcards responsiva
- [x] 20 perguntas organizadas por categoria
- [x] Navegação entre perguntas
- [x] Exibição/ocultação de respostas
- [x] Dashboard com progresso por categoria
- [x] Design moderno e profissional
- [x] API RESTful completa
- [x] Integração frontend-backend

### 🔄 Para Desenvolvimento Futuro
- [ ] Preenchimento das respostas baseadas no Catecismo
- [ ] Sistema de progresso persistente no backend
- [ ] Funcionalidade de favoritos
- [ ] Modo de estudo personalizado
- [ ] Exportação de progresso
- [ ] Sistema de conquistas/badges

## Observações Importantes

1. **Respostas Vazias**: Conforme especificado no prompt original, as respostas não foram preenchidas pela IA. Elas estão prontas para serem completadas externamente com base no Catecismo da Igreja Católica.

2. **Armazenamento Local**: O progresso do usuário é armazenado no LocalStorage do navegador. Para produção, recomenda-se implementar persistência no backend.

3. **Segurança**: O sistema de autenticação atual é básico e adequado para demonstração. Para produção, implementar autenticação JWT ou OAuth.

4. **Escalabilidade**: A estrutura permite fácil adição de novas perguntas e categorias através do arquivo `questions.json`.

## Contribuição

Este projeto foi desenvolvido seguindo as especificações detalhadas fornecidas, mantendo fidelidade aos requisitos de um quiz católico educativo para adultos iniciantes na fé.

## Licença

Projeto desenvolvido para fins educativos e de formação católica.

---

**Quiz Pro Nobis** - *"Para nós, o quiz"* - Desenvolvido com dedicação para o aprofundamento da fé católica.

