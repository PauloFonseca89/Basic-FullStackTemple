import { editarFilmeAPI, eliminarFilmeAPI } from "../services/api";

function getId(movie) { return movie._id || movie.id; }

export default function EditMovie({ movie, onChanged }) {
  async function toggleWatched() {
    await editarFilmeAPI(getId(movie), { visto: !movie.visto }); // envia { Filme } por dentro
    onChanged?.();
  }
  async function changeRating() {
    const val = prompt("Nova avaliação (1-10):", movie.avaliacao ?? 1);
    if (!val) return;
    await editarFilmeAPI(getId(movie), { avaliacao: Number(val) });
    onChanged?.();
  }
  async function removeMovie() {
    if (!confirm(`Eliminar "${movie.titulo}"?`)) return;
    await eliminarFilmeAPI(getId(movie));
    onChanged?.();
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={toggleWatched}>Marcar {movie.visto ? "como não visto" : "como visto"}</button>
      <button onClick={changeRating}>Editar avaliação</button>
      <button onClick={removeMovie}>Eliminar</button>
    </div>
  );
}
