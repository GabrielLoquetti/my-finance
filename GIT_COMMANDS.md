# 🔄 Comandos Git - MyFinance

## 📝 Primeiro Commit (Agora)

```bash
# 1. Ver status dos arquivos
git status

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer o commit inicial
git commit -m "🎉 Initial commit: Sistema completo de gestão financeira

- Autenticação segura com criptografia
- Dashboard interativo com gráficos
- Gestão mensal de receitas e despesas (37 categorias)
- Sistema de previsão inteligente
- Saldo acumulado conectado mês a mês
- Export/Import de dados em JSON
- Suporte para múltiplos anos (2024-2028)
- Design moderno e responsivo
- Performance otimizada com Vite + React 18

Tech stack:
- React 18.3.1
- Vite 5.4.2
- Chart.js 4.4.0
- React Router 6.27.0
- Crypto-js 4.2.0
- Lucide React (ícones)

Login padrão:
- Usuário: myfinance
- Senha: finance1234"

# 4. Se ainda não tem remote, adicione:
git remote add origin https://github.com/seu-usuario/my-finance.git

# 5. Push para o GitHub
git push -u origin main
```

## 🔧 Comandos Úteis do Dia a Dia

### Ver Status
```bash
git status              # Ver arquivos modificados
git diff                # Ver diferenças nos arquivos
git log --oneline       # Ver histórico de commits
```

### Salvar Mudanças
```bash
git add .               # Adicionar todos os arquivos
git add arquivo.js      # Adicionar arquivo específico
git commit -m "mensagem"  # Fazer commit
git push                # Enviar para GitHub
```

### Desfazer Coisas
```bash
git restore arquivo.js  # Descartar mudanças de um arquivo
git reset HEAD~1        # Desfazer último commit (mantém mudanças)
git reset --hard HEAD~1 # Desfazer último commit (PERDE mudanças)
```

### Branches
```bash
git branch              # Ver branches
git branch feature-x    # Criar branch
git checkout feature-x  # Trocar de branch
git checkout -b feature-x  # Criar e trocar
git merge feature-x     # Mesclar branch
git branch -d feature-x # Deletar branch
```

## 📋 Padrão de Commits

### Tipos de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Apenas documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `perf:` Melhoria de performance
- `test:` Adicionar ou corrigir testes
- `chore:` Tarefas de build, configs, etc

### Exemplos
```bash
git commit -m "feat: adicionar gráfico de pizza no dashboard"
git commit -m "fix: corrigir cálculo de saldo acumulado em março"
git commit -m "docs: atualizar README com instruções de deploy"
git commit -m "style: ajustar espaçamento nos cards de métrica"
git commit -m "refactor: extrair lógica de cálculo para utils"
git commit -m "perf: otimizar renderização do gráfico"
git commit -m "chore: atualizar dependências do projeto"
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel

# 4. Deploy para produção
vercel --prod
```

### Netlify
```bash
# 1. Build
npm run build

# 2. Arraste a pasta 'dist' para:
https://app.netlify.com/drop
```

### GitHub Pages
```bash
# 1. Adicione ao vite.config.js:
base: '/my-finance/'

# 2. Build
npm run build

# 3. Deploy com gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## 🔐 Proteger Credenciais

### .gitignore (já configurado)
```
# Não commitar:
.env
.env.local
node_modules/
dist/
```

### .env
```bash
# Criar arquivo .env (NÃO commitar!)
cp .env.example .env

# Editar com suas credenciais
# IMPORTANTE: .env não vai para o GitHub!
```

## 📊 Workflow Sugerido

### Desenvolvimento Diário
```bash
# 1. Atualizar do GitHub
git pull

# 2. Criar branch para feature
git checkout -b feat/nova-funcionalidade

# 3. Trabalhar, fazer commits
git add .
git commit -m "feat: implementar nova funcionalidade"

# 4. Voltar para main
git checkout main

# 5. Mesclar mudanças
git merge feat/nova-funcionalidade

# 6. Enviar para GitHub
git push

# 7. Deletar branch local
git branch -d feat/nova-funcionalidade
```

### Backup Regular
```bash
# Fazer commit a cada mudança importante
git add .
git commit -m "chore: backup $(date +'%Y-%m-%d %H:%M')"
git push
```

## 🆘 Problemas Comuns

### Erro ao fazer push
```bash
# Se aparecer "rejected" ou "non-fast-forward":
git pull --rebase
git push
```

### Deletar arquivo do Git (mas manter localmente)
```bash
git rm --cached arquivo.js
echo "arquivo.js" >> .gitignore
git commit -m "chore: remover arquivo.js do git"
```

### Ver tamanho do repositório
```bash
git count-objects -vH
```

### Limpar histórico (cuidado!)
```bash
# Remove todo histórico e começa do zero
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git remote add origin URL
git push -u --force origin main
```

## 📝 Boas Práticas

1. ✅ Commit frequente (a cada funcionalidade)
2. ✅ Mensagens descritivas
3. ✅ Use branches para features grandes
4. ✅ Faça pull antes de push
5. ✅ Teste antes de commitar
6. ✅ Não commite node_modules
7. ✅ Não commite .env
8. ✅ Use .gitignore corretamente

## 🎯 Próximos Commits Sugeridos

```bash
# Quando adicionar funcionalidades:
git commit -m "feat: adicionar modo claro/escuro"
git commit -m "feat: implementar gráfico de pizza"
git commit -m "feat: adicionar metas de economia"
git commit -m "feat: comparação entre meses"

# Quando corrigir bugs:
git commit -m "fix: corrigir formatação de moeda em mobile"
git commit -m "fix: resolver problema de scroll na sidebar"

# Quando melhorar:
git commit -m "perf: otimizar carregamento inicial"
git commit -m "style: melhorar responsividade em tablet"
git commit -m "docs: adicionar screenshots no README"
```

---

**Dica**: Use `git log --oneline --graph --all` para ver uma árvore bonita do histórico!
