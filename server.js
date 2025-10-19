// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

// MODELO (usa o ficheiro ./models/Filme.js)
const FilmeModel = require('./models/Filme'); // <- garantir que o module.exports = mongoose.model('Filme', schema)

// ===== ENDPOINTS DA API =====

// GET Retorna todos os filmes 
app.get('/api/Filmes', async (req, res) => {
  try {
    const { visto, sortBy, order } = req.query;

    const query = {};
    if (visto === 'true') query.visto = true;
    if (visto === 'false') query.visto = false;

    let sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sort = { createdAt: -1 };
    }

    const filmes = await FilmeModel.find(query).sort(sort).exec();
    res.json(filmes);
  } catch (error) {
    console.error('Erro ao carregar Filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST / Adiciona um novo filme
app.post('/api/Filmes', async (req, res) => {
  try {
    const { Filme } = req.body; // <- conforme pediste
    if (!Filme) {
      return res.status(400).json({ erro: 'Objeto Filme é obrigatório' });
    }

    const { titulo, ano, genero, visto = false, avaliacao = 1 } = Filme;

    if (!titulo || !ano || !genero) {
      return res.status(400).json({ erro: 'Campos titulo, ano e genero são obrigatórios' });
    }

    const novo = await FilmeModel.create({
      titulo: String(titulo).trim(),
      ano: Number(ano),
      genero: String(genero).trim(),
      visto: Boolean(visto),
      avaliacao: Number(avaliacao),
    });

    res.status(201).json(novo);
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({ erro: 'Este Filme já existe' });
    }
    console.error('Erro ao criar Filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /Atualiza um filme existente
app.put('/api/Filmes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Filme } = req.body; // manter consistente com o POST

    if (!Filme) {
      return res.status(400).json({ erro: 'Objeto Filme é obrigatório' });
    }

    const atualizado = await FilmeModel.findByIdAndUpdate(id, Filme, {
      new: true,
      runValidators: true,
    });

    if (!atualizado) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar Filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// DELETE /api/Filmes/:id - Elimina um filme
app.delete('/api/Filmes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await FilmeModel.findByIdAndDelete(id);
    if (!removido) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao eliminar Filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
