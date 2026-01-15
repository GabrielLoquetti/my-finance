# 🚀 Deploy no GitHub Pages

## ✅ Configuração Completa

O projeto já está **100% configurado** para GitHub Pages!

---

## 📋 Passo a Passo Completo

### 1️⃣ Fazer Build Local (Teste)

```bash
# Build do projeto
npm run build

# Testar a build localmente
npm run preview
```

Acesse http://localhost:4173 para testar se está tudo funcionando.

---

### 2️⃣ Commit e Push para GitHub

```bash
# Ver arquivos modificados
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "🚀 feat: Deploy completo com GitHub Pages configurado

- Configurado vite.config.js com base path
- Adicionado workflow GitHub Actions
- Sistema pronto para deploy automático
- Funcional com todas as features de segurança"

# Se ainda não tem remote, adicione (AJUSTE O SEU USUÁRIO):
git remote add origin https://github.com/SEU-USUARIO/my-finance.git

# Push para GitHub
git push -u origin main
```

---

### 3️⃣ Configurar GitHub Pages no Repositório

1. Acesse seu repositório no GitHub: `https://github.com/SEU-USUARIO/my-finance`

2. Clique em **Settings** (Configurações)

3. No menu lateral esquerdo, clique em **Pages**

4. Em **Source** (Origem), selecione:
   - **GitHub Actions** (não escolha branch!)

5. Pronto! O deploy automático está configurado! ✅

---

### 4️⃣ Aguardar o Deploy

1. Vá em **Actions** no topo do repositório

2. Você verá o workflow "Deploy to GitHub Pages" rodando

3. Aguarde finalizar (leva ~1-2 minutos)

4. Quando ficar verde ✅, seu site está no ar!

---

### 5️⃣ Acessar seu Site

Seu sistema estará disponível em:

```
https://SEU-USUARIO.github.io/my-finance/
```

**Exemplo:**
```
https://gabrielsilva.github.io/my-finance/
```

---

## 🔄 Deploy Automático

**Agora toda vez que você fizer push:**

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push
```

**O GitHub Actions vai:**
1. ✅ Detectar o push
2. ✅ Instalar dependências
3. ✅ Fazer build
4. ✅ Deploy automático
5. ✅ Site atualizado em ~2 minutos!

---

## 🎯 Arquivos Criados para GitHub Pages

### ✅ Configurações Aplicadas:

1. **vite.config.js** - Adicionado `base: '/my-finance/'`
2. **.github/workflows/deploy.yml** - Workflow automático de deploy
3. Este guia - Instruções completas

---

## ⚠️ IMPORTANTE

### Se o nome do seu repositório for DIFERENTE:

1. Edite `vite.config.js` linha 6:
```javascript
base: '/NOME-DO-SEU-REPO/', // Mude aqui
```

2. Faça build novamente:
```bash
npm run build
git add .
git commit -m "fix: ajustar base path"
git push
```

---

## 🔐 Credenciais de Login

**Mesmo no GitHub Pages:**
- Usuário: `myfinance`
- Senha: `finance1234`

Todos os dados ficam **salvos no navegador de quem acessa**, não no GitHub!

---

## 📊 Verificar Status do Deploy

### No GitHub:
1. Vá em **Actions**
2. Veja os workflows rodando
3. Clique no último para ver detalhes

### Logs:
- ✅ Verde = Deploy com sucesso
- ❌ Vermelho = Erro (veja os logs)
- 🟡 Amarelo = Em andamento

---

## 🛠️ Comandos Úteis

### Build Local:
```bash
npm run build        # Criar build de produção
npm run preview      # Testar build localmente
```

### Deploy Manual (alternativa):
```bash
# Instalar gh-pages
npm install -D gh-pages

# Adicionar script no package.json:
"deploy": "gh-pages -d dist"

# Deploy manual
npm run deploy
```

---

## 🔍 Troubleshooting

### ❌ Página em branco?
**Solução:** Verifique se o `base` no `vite.config.js` está correto.

### ❌ 404 Not Found?
**Solução:**
1. Vá em Settings > Pages
2. Confirme que está usando "GitHub Actions"
3. Aguarde 1-2 minutos após o deploy

### ❌ Assets não carregam?
**Solução:** O `base: '/my-finance/'` resolve isso. Certifique-se que está configurado.

### ❌ Workflow não roda?
**Solução:**
1. Verifique se o arquivo está em `.github/workflows/deploy.yml`
2. Vá em Settings > Actions > General
3. Ative "Allow all actions and reusable workflows"

---

## 📱 Compartilhar seu Sistema

Após deploy, você pode compartilhar:

```
https://SEU-USUARIO.github.io/my-finance/
```

**Cada pessoa que acessar:**
- ✅ Terá sua própria sessão
- ✅ Seus próprios dados (salvos no navegador)
- ✅ Não vê os dados de outras pessoas
- ✅ Precisa fazer login

---

## 🎨 Customização

### Mudar Nome do Repositório:

1. No GitHub: Settings > Rename
2. Atualize `vite.config.js`:
```javascript
base: '/novo-nome/',
```
3. Rebuild e push

### Domínio Próprio:

1. Em Settings > Pages
2. Adicione "Custom domain"
3. Configure DNS do seu domínio
4. Aguarde propagação

---

## 💡 Dicas

1. **Primeiro deploy** leva ~2 minutos
2. **Deploys seguintes** são mais rápidos (~1 minuto)
3. **Cache do navegador**: Limpe se não ver mudanças
4. **Mobile**: Funciona perfeitamente em celulares!
5. **PWA**: Pode virar app instalável (futuro)

---

## 🎯 Checklist Final

Antes do primeiro deploy:

- [ ] Fazer build local e testar (`npm run preview`)
- [ ] Commit de todos os arquivos
- [ ] Push para GitHub
- [ ] Configurar Pages no repositório
- [ ] Aguardar workflow finalizar
- [ ] Acessar URL e testar
- [ ] Fazer login e testar funcionalidades
- [ ] Testar em mobile

---

## 🎊 Pronto!

Seu sistema de gestão financeira está:

✅ **No ar no GitHub Pages**
✅ **Acessível de qualquer lugar**
✅ **Deploy automático configurado**
✅ **Grátis para sempre**
✅ **Seguro e privado**

---

**URL do seu sistema:**
```
https://SEU-USUARIO.github.io/my-finance/
```

**Compartilhe com seus amigos!** 🎉

---

Desenvolvido com ❤️ | Deploy em 2 minutos ⚡
