import { useEffect, useState } from "react";
import { carregarFilmesAPI } from "../services/api";
import EditMovie from "./EditMovie";

export default function NotWatchedMovies() {
  const [filmes, setFilmes] = useState([]);
  const load = async () => setFilmes(await carregarFilmesAPI({ visto: false }));
  useEffect(() => { load(); }, []);
  return (
    <div>
      {filmes.map(f => (
        <div key={f._id || f.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
          <div><strong>{f.titulo}</strong> ({f.ano}) — ⭐ {f.avaliacao}</div>
          <EditMovie movie={f} onChanged={load} />
        </div>
      ))}
    </div>
  );
}
