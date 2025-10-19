import { useEffect, useState } from "react";
import { carregarFilmesAPI } from "../services/api";
import EditMovie from "./EditMovie";

export default function AllMovies({ refreshKey = 0 }) {
  const [filmes, setFilmes] = useState([]);

  async function load(params = {}) {
    const data = await carregarFilmesAPI(params);
    setFilmes(data);
  }

  useEffect(() => { load(); }, [refreshKey]); // <= refaz o GET quando adicionas

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => load()}>Todos</button>
        <button onClick={() => load({ visto: true })}>Vistos</button>
        <button onClick={() => load({ visto: false })}>Por ver</button>
        <button onClick={() => load({ sortBy: "avaliacao", order: "desc" })}>Ordenar por Avaliação</button>
      </div>

      {filmes.map(f => (
        <div key={f._id || f.id} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{f.titulo} ({f.ano})</strong>
            <small>{f.genero} • ⭐ {f.avaliacao ?? 1} • {f.visto ? "Visto" : "Por ver"}</small>
          </div>
          <div style={{ marginTop: 8 }}>
            <EditMovie movie={f} onChanged={() => load()} />
          </div>
        </div>
      ))}
    </>
  );
}
