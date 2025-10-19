import { useState } from "react";
import { adicionarFilmeAPI } from "../services/api";

export default function AddMovie({ onAdded }) {
  const [form, setForm] = useState({
    titulo: "",
    ano: "",
    genero: "",
    visto: "false",
    avaliacao: 1,
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // enviar o objeto Filme; a API embrulha como { Filme } (conforme enunciado)
      await adicionarFilmeAPI({
        titulo: form.titulo.trim(),
        ano: Number(form.ano),
        genero: form.genero.trim(),
        visto: form.visto === "true",
        avaliacao: Number(form.avaliacao || 1),
      });
      setForm({ titulo: "", ano: "", genero: "", visto: "false", avaliacao: 1 });
      onAdded?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={onChange} required />
      <input name="ano" type="number" placeholder="Ano" value={form.ano} onChange={onChange} required />
      <input name="genero" placeholder="Género" value={form.genero} onChange={onChange} required />
      <select name="visto" value={form.visto} onChange={onChange}>
        <option value="false">Por ver</option>
        <option value="true">Visto</option>
      </select>
      <input name="avaliacao" type="number" min="1" max="10" value={form.avaliacao} onChange={onChange} />
      <button disabled={loading}>{loading ? "A enviar..." : "Adicionar Filme"}</button>
    </form>
  );
}
