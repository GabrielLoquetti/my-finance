# 🚀 Guia Rápido - MyFinance

## ⚡ Início Rápido

### 1️⃣ Primeiro Acesso

O servidor de desenvolvimento já está rodando em:
**http://localhost:3000**

**Credenciais de Login:**
- Usuário: `myfinance`
- Senha: `finance1234`

### 2️⃣ Navegação

**Sidebar Esquerda:**
- 📊 **Dashboard**: Visão geral anual
- 📅 **12 Meses**: Janeiro até Dezembro

**Topo Direito:**
- 📅 **Seletor de Ano**: Escolha entre 2024-2028
- 🚪 **Sair**: Fazer logout

### 3️⃣ Como Usar

#### No Dashboard:
1. Veja as métricas anuais (Receitas, Despesas, Saldo, Taxa de Economia)
2. Analise o gráfico de evolução mensal
3. Exporte/Importe/Limpe seus dados

#### Nos Meses:
1. Clique em qualquer mês na sidebar
2. Preencha as **Receitas** (salários, investimentos, etc)
3. Preencha as **Despesas Fixas** (aluguel, contas, etc)
4. Preencha as **Despesas Variáveis** (compras, lazer, etc)
5. Veja o resumo automático no final da página

### 4️⃣ Recursos Inteligentes

#### 🪄 Previsão Automática
- A partir de **Fevereiro**, aparece o botão "Aplicar Previsão"
- Clique para preencher automaticamente com a média dos últimos 3 meses
- Ajuste os valores conforme necessário

#### 💾 Salvamento Automático
- **Tudo é salvo automaticamente** enquanto você digita
- Dados criptografados no navegador
- Não precisa clicar em "Salvar"

#### 🏦 Saldo Acumulado
- Mostra quanto você TEM NO BANCO em cada mês
- Janeiro: R$ 2.000
- Fevereiro: Saldo de Jan + Saldo de Fev
- Março: Saldo Acumulado de Fev + Saldo de Mar
- E assim por diante...

### 5️⃣ Comandos Úteis

**Desenvolvimento:**
```bash
npm run dev          # Iniciar servidor (porta 3000)
npm run build        # Criar build de produção
npm run preview      # Testar build de produção
```

**Git:**
```bash
git add .
git commit -m "Mensagem"
git push
```

### 6️⃣ Backup dos Dados

#### Exportar:
1. Vá no Dashboard
2. Clique em "Exportar Dados"
3. Arquivo JSON será baixado

#### Importar:
1. Vá no Dashboard
2. Clique em "Importar Dados"
3. Selecione o arquivo JSON

⚠️ **Importante**: Faça backup regularmente!

### 7️⃣ Trocar de Ano

1. Use o seletor no topo direito
2. Cada ano tem dados separados
3. Os dados são mantidos ao trocar de ano

### 8️⃣ Segurança

✅ **O que temos:**
- Login com senha
- Dados criptografados (AES-256)
- Sessão expira em 24h
- Tudo salvo localmente (sem servidor)

⚠️ **Para produção real:**
- Altere as credenciais em `src/context/AuthContext.jsx`
- Use backend com banco de dados
- Implemente 2FA (autenticação dois fatores)

### 9️⃣ Atalhos de Teclado

- **Tab**: Navegar entre campos
- **Enter**: Próximo campo (em inputs)
- **Esc**: Cancelar modais

### 🔟 Dicas Pro

1. **Preencha Janeiro primeiro** - depois use previsão nos outros meses
2. **Exporte todo mês** - faça backup dos dados
3. **Use categorias específicas** - facilita análise
4. **Confira o Dashboard** - veja tendências
5. **Saldo negativo é vermelho** - atenção aos gastos!

## ❓ Problemas Comuns

**Não consigo fazer login:**
- Verifique usuário: `myfinance`
- Verifique senha: `finance1234`
- Limpe o cache do navegador

**Dados não salvam:**
- Verifique se o localStorage está habilitado
- Tente outro navegador

**Gráfico não aparece:**
- Aguarde carregar completamente
- Atualize a página (F5)

**Previsão não funciona:**
- Só funciona a partir do 2º mês
- Precisa ter dados nos meses anteriores

## 📞 Suporte

- Leia o README.md completo
- Veja os arquivos de código
- Abra uma issue no GitHub

## 🎯 Próximos Passos

1. ✅ Faça login
2. ✅ Preencha Janeiro
3. ✅ Use previsão em Fevereiro
4. ✅ Veja o Dashboard
5. ✅ Faça backup dos dados

---

**Pronto! Agora você está pronto para gerenciar suas finanças! 💰**

O servidor está rodando em: http://localhost:3000
