const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'longo-passeio-dev-secret';

app.use(cors());
app.use(express.json());

// Serve the frontend from the ui kit folder
app.use(express.static(path.join(__dirname, '../project/ui_kits/app')));

// ── In-memory user store ─────────────────────────────────────────────────────
// Em produção, substituir por banco de dados.
const users = [];
let nextId  = 1;

// Usuário padrão para testes
(async () => {
  users.push({
    id:           nextId++,
    email:        'admin@longopasseio.com',
    passwordHash: await bcrypt.hash('Admin@1', 10),
    name:         'Admin',
    createdAt:    new Date().toISOString(),
  });
})();

// ── Helpers ──────────────────────────────────────────────────────────────────

function validatePassword(pwd) {
  if (!pwd || pwd.length < 6)     return 'senha precisa ter ao menos 6 caracteres';
  if (!/[a-zA-Z]/.test(pwd))      return 'senha precisa conter ao menos uma letra';
  if (!/\d/.test(pwd))            return 'senha precisa conter ao menos um número';
  if (!/[^a-zA-Z\d]/.test(pwd))  return 'senha precisa conter ao menos um caractere especial';
  return null;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function safeUser(u) {
  return { id: u.id, email: u.email, name: u.name, createdAt: u.createdAt };
}

// ── Auth middleware ──────────────────────────────────────────────────────────

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'não autorizado' });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'token inválido ou expirado' });
  }
}

// ── Routes ───────────────────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: 'e-mail e senha são obrigatórios' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'e-mail inválido' });
  }

  const pwdError = validatePassword(password);
  if (pwdError) return res.status(400).json({ error: pwdError });

  if (users.find(u => u.email === email.toLowerCase())) {
    return res.status(409).json({ error: 'e-mail já cadastrado' });
  }

  const user = {
    id:           nextId++,
    email:        email.toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
    name:         name?.trim() || email.split('@')[0],
    createdAt:    new Date().toISOString(),
  };
  users.push(user);

  res.status(201).json({ token: makeToken(user), user: safeUser(user) });
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: 'e-mail e senha são obrigatórios' });
  }

  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'e-mail ou senha incorretos' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'e-mail ou senha incorretos' });
  }

  res.json({ token: makeToken(user), user: safeUser(user) });
});

// GET /api/auth/me  (rota protegida — exemplo)
app.get('/api/auth/me', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'usuário não encontrado' });
  res.json(safeUser(user));
});

// Fallback: serve index.html para rotas não-API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../project/ui_kits/app/index.html'));
});

// ── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\nLongo Passeio API → http://localhost:${PORT}`);
  console.log(`Login              → http://localhost:${PORT}/login.html`);
  console.log(`App                → http://localhost:${PORT}/index.html`);
  console.log(`\nUsuário de teste:`);
  console.log(`  e-mail: admin@longopasseio.com`);
  console.log(`  senha:  Admin@1\n`);
});
