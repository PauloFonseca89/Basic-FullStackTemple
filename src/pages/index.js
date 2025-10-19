import { useState } from "react";
import AddMovie from "../components/AddMovie";
import AllMovies from "../components/AllMovies";
import WatchedMovies from "../components/WatchedMovies";
import NotWatchedMovies from "../components/NotWatchedMovies";
import MoviesByRating from "../components/MoviesByRating";

export default function Home() {
  const [tab, setTab] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  function onAdded() {
    // força as listas a refazer GET
    setRefreshKey(k => k + 1);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>🎬 Movie Watchlist</h1>

      <section style={{ margin: "16px 0" }}>
        <h3>Adicionar Filme</h3>
        <AddMovie onAdded={onAdded} />
      </section>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab("all")}>Todos</button>
        <button onClick={() => setTab("watched")}>Vistos</button>
        <button onClick={() => setTab("notwatched")}>Por ver</button>
        <button onClick={() => setTab("rating")}>Por Avaliação</button>
      </div>

      {tab === "all" && <AllMovies refreshKey={refreshKey} />}
      {tab === "watched" && <WatchedMovies refreshKey={refreshKey} />}
      {tab === "notwatched" && <NotWatchedMovies refreshKey={refreshKey} />}
      {tab === "rating" && <MoviesByRating refreshKey={refreshKey} />}
    </div>
  );
}
