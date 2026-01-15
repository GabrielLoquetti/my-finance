# 💰 MyFinance - Sistema de Gestão Financeira Pessoal

Sistema completo e profissional de gestão financeira pessoal desenvolvido em React com segurança, performance e design moderno.

## 🚀 Características

### ✨ Funcionalidades Principais

- **Dashboard Interativo**: Visualização completa anual com gráficos de evolução
- **Gestão Mensal**: Controle detalhado de receitas e despesas por mês
- **Previsão Inteligente**: Sistema automático de previsão baseado na média dos últimos 3 meses
- **Saldo Acumulado**: Acompanhamento do saldo real no banco mês a mês
- **Export/Import**: Backup e restauração de dados em JSON
- **Múltiplos Anos**: Suporte para gestão de diferentes anos (2024-2028)

### 🔒 Segurança

- **Autenticação Segura**: Sistema de login com criptografia SHA-256
- **Dados Criptografados**: Todos os dados financeiros são criptografados com AES antes de serem salvos no localStorage
- **Sessão Temporizada**: Token de autenticação válido por 24 horas
- **Proteção de Rotas**: Rotas protegidas que redirecionam para login se não autenticado

### 🎨 Design

- **Interface Moderna**: Dark mode profissional estilo dashboard empresarial
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e animações para melhor UX
- **Performance**: Otimizado com React 18 e Vite

## 📋 Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/my-finance.git
cd my-finance
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🔑 Credenciais Padrão

- **Usuário**: `myfinance`
- **Senha**: `finance1234`

> ⚠️ **Importante**: Em produção, altere estas credenciais no arquivo `src/context/AuthContext.jsx`

## 📁 Estrutura do Projeto

```
my-finance/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   └── MetricCard.jsx
│   ├── context/           # Context API para estado global
│   │   ├── AuthContext.jsx      # Autenticação
│   │   └── FinanceContext.jsx   # Dados financeiros
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── Month.jsx
│   ├── styles/            # Estilos CSS
│   │   └── index.css
│   ├── utils/             # Funções utilitárias
│   │   └── formatters.js
│   ├── App.jsx            # Componente raiz
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 📊 Categorias Financeiras

### Receitas (7 categorias)
- Salário Principal
- Salário Cônjuge
- Freelance/Bicos
- Rendimentos de Investimentos
- 13º Salário
- Férias
- Outras Receitas

### Despesas Fixas (15 categorias)
- Aluguel/Financiamento Imóvel
- Condomínio
- IPTU
- Energia Elétrica
- Água e Esgoto
- Internet + TV a Cabo
- Telefone/Celular
- Plano de Saúde
- Seguros
- IPVA
- Educação/Mensalidades/Cursos
- Transporte Fixo
- Academia/Clube
- Assinaturas
- Financiamentos/Empréstimos

### Despesas Variáveis (15 categorias)
- Supermercado/Alimentação
- Restaurantes/Delivery
- Transporte Variável
- Lazer/Diversão/Entretenimento
- Viagens
- Roupas/Vestuário/Calçados
- Farmácia/Saúde/Médicos
- Beleza/Estética/Salão
- Presentes
- Pets
- Manutenção/Reparos Casa
- Eletrônicos/Tecnologia
- Livros/Cultura/Cursos Online
- Doações
- Outras Despesas Variáveis

## 🔐 Segurança dos Dados

### Criptografia
- **Autenticação**: SHA-256 para hash de senhas
- **Dados**: AES-256 para criptografia dos dados financeiros
- **Chaves**: Chaves de criptografia configuráveis nos arquivos de contexto

### Armazenamento
- Dados salvos no localStorage do navegador
- Totalmente offline após primeiro carregamento
- Sem envio de dados para servidores externos

### Melhorias para Produção
Para uso em produção, considere:
1. Mover credenciais para variáveis de ambiente
2. Implementar backend com autenticação JWT
3. Usar banco de dados seguro (PostgreSQL, MongoDB)
4. Adicionar autenticação de dois fatores (2FA)
5. Implementar HTTPS obrigatório

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

Para testar a build:
```bash
npm run preview
```

## 📱 Deploy

### Opções de Hospedagem Gratuita

1. **Vercel** (Recomendado)
```bash
npm install -g vercel
vercel
```

2. **Netlify**
- Arraste a pasta `dist` para netlify.com/drop

3. **GitHub Pages**
- Configure o workflow do GitHub Actions

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões:
- Abra uma issue no GitHub
- Entre em contato pelo email

## 🎯 Roadmap Futuro

- [ ] PWA (Progressive Web App)
- [ ] Modo claro/escuro toggle
- [ ] Gráfico de pizza para distribuição de despesas
- [ ] Metas de economia mensais
- [ ] Alertas de gastos excessivos
- [ ] Comparação entre meses
- [ ] Exportar relatórios em PDF
- [ ] Sincronização na nuvem
- [ ] App mobile nativo

---

Desenvolvido com ❤️ para ajudar você a ter controle total das suas finanças!
