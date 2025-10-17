import { useState } from 'react';
import { adicionarFilmeAPI } from '../services/api';

export default function Adicionarfilme() {
  const [novoFilme, setNovoFilme] = useState('');

  async function adicionarFilme() {
    if (!novoFilme) return;
    try {
      await adicionarFilmeAPI(novoFilme);
      setNovoFilme('');
    } catch (error) {
      console.error('Erro ao adicionar Filme:', error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Adicionar Filmes</h2>
      
      <form onSubmit={adicionarFilme} className="flex gap-1 mb-3">
        <input
          type="text"
          value={novoFilme}
          onChange={(e) => setNovoFilme(e.target.value)}
          placeholder="Novo Filme"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <button type="submit" disabled={!novoFilme} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>
    </div>
  );
}
