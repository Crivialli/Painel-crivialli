# 📌 Sistema de Painel de Setores (Plataformas Internas)

Este projeto é um painel interno para organização de **setores da empresa**, permitindo acesso rápido a sistemas, links e ferramentas.

Possui também um **modo administrador**, onde é possível gerenciar botões dinamicamente sem alterar o código.

---

# 🚀 Tecnologias utilizadas

* React (Vite)
* Supabase (Banco + Storage)
* TailwindCSS
* React Router

---

# ⚙️ Como rodar o projeto

## 1. Clonar o repositório

```bash
git clone <repo-url>
cd nome-do-projeto
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

---

## 4. Rodar o projeto

```bash
npm run dev
```

---

# 🧱 Estrutura do Banco (Supabase)

## 📌 Tabela: `setores`

| campo | tipo |
| ----- | ---- |
| id    | uuid |
| nome  | text |
| slug  | text |

### Exemplo:

| nome                  | slug                  |
| --------------------- | --------------------- |
| Faturamento           | faturamento           |
| RH                    | rh                    |
| Assuntos Regulatorios | assuntos-regulatorios |

---

## 📌 Tabela: `plataformas`

| campo    | tipo    |
| -------- | ------- |
| id       | uuid    |
| setor_id | uuid    |
| nome     | text    |
| url      | text    |
| img      | text    |
| external | boolean |
| ativo    | boolean |
| ordem    | int     |

---

# 🗂️ Storage (Imagens)

Criar bucket no Supabase:

```
plataformas
```

### ⚠️ IMPORTANTE

* Deixar como **público**
* Usado para armazenar imagens dos botões

---

# 🔐 Permissões (RLS)

Se estiver usando Row Level Security:

👉 Permitir INSERT:

```sql
CREATE POLICY "Allow insert"
ON plataformas
FOR INSERT
TO public
WITH CHECK (true);
```

👉 Permitir SELECT:

```sql
CREATE POLICY "Allow select"
ON plataformas
FOR SELECT
TO public
USING (true);
```

---

# 🧠 Como funciona o sistema

## 🔗 Rotas

Cada setor é acessado por:

```
/setor/:slug
```

Exemplo:

```
/setor/faturamento
/setor/assuntos-regulatorios
```

---

## ⚠️ PADRÃO IMPORTANTE

O sistema usa **slug**, NÃO nome.

❌ Errado:

```
/setor/ar
```

✅ Correto:

```
/setor/assuntos-regulatorios
```

---

# 👨‍💻 Modo Administrador

O admin permite:

* ➕ Adicionar botão
* ✏️ Editar botão
* 🖼️ Upload de imagem
* ♻️ Reutilizar imagem existente
*  📱 Adicionar e editar ramais nos setores

---

## ➕ Adicionar botão

### Campos:

* Setor
* Nome
* URL
* Imagem (upload OU existente)
* Abrir em nova aba

### Fluxo:

1. Seleciona setor
2. Preenche dados
3. Envia imagem (ou reutiliza)
4. Salva

---

## 🖼️ Imagens

### Upload:

* A imagem é enviada para o Supabase Storage
* Nome gerado automaticamente:

```
timestamp-nomeOriginal.png
```

### Salvamento:

* O sistema salva **URL pública** no banco

---

## ♻️ Reutilizar imagem

* Dropdown mostra imagens já enviadas
* Ao selecionar:

  * preview é exibido
  * URL é reaproveitada

---

## 👁️ Preview

Antes de salvar:

* Upload → mostra preview local
* Seleção → mostra imagem do storage

---

# 📦 Renderização dos botões

Os botões são carregados do banco via função:

```js
getSectorButtons()
```

Estrutura final:

```js
[
  {
    title: "Faturamento",
    slug: "faturamento",
    items: [...]
  }
]
```

---

# ⚠️ Problemas comuns

## ❌ Botão não aparece

Verifique:

* slug da URL bate com banco?
* setor_id correto?
* campo `ativo = true`?
* imagem válida?

---

## ❌ Imagem não carrega

* bucket é público?
* URL está correta?
* campo `img` não está vazio?

---

## ❌ Erro de RLS

Mensagem:

```
new row violates row-level security policy
```

👉 Solução:

* liberar INSERT no Supabase

---

# 🧪 Debug rápido

```js
console.log(setor);
console.log(buttons);
```

---

# 📈 Melhorias futuras (opcional)

* Drag & drop para ordenar botões
* Upload com preview avançado
* Sistema de autenticação admin
* Soft delete (ativo/inativo)
* Cache de imagens

---

# ✅ Conclusão

Sistema permite:

✔ Gerenciamento dinâmico de botões
✔ Upload e reutilização de imagens
✔ Estrutura escalável via slug
✔ Controle total via admin

---

# 📞 Suporte

Em caso de erro:

1. Verificar console do navegador
2. Verificar dados no Supabase
3. Conferir slug e URLs

---

🚀 Pronto! Sistema funcional e pronto para uso interno.

