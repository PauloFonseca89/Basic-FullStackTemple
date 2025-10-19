const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    ano: { type: Number, required: true },
    genero: { type: String, required: true, trim: true },
    visto: { type: Boolean, default: false },
    avaliacao: { type: Number, min: 1, max: 10, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Filme', FilmeSchema);
