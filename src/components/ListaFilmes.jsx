import { useState, useEffect } from 'react';
import { carregarListaFilmesAPI } from '../services/api';

export default function ListaFilmes() {
  const [Filmes, setFilmes] = useState([]);

  async function carregarListaFilmes() {
    try {
      const data = await carregarListaFilmesAPI();
      setFilmes(data);
    } catch (error) {
      console.error('Erro ao carregar a lista:', error);
    }
  }

  useEffect(() => {
    carregarListaFilmes();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Filmes</h2>

      <div>
        {Filmes.map((item) => (
          <div key={item._id}>
            {item.Filme}
          </div>
        ))}
      </div>
    </div>
  );
}
