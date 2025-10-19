// src/services/api.js

// GET /api/Filmes - Carregar todos os Filmes
export async function carregarFilmesAPI() {
  try {
    const response = await fetch('/api/Filmes');

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      throw new Error('Erro ao carregar Filmes');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao carregar Filmes:', error);
    throw error;
  }
}

// POST /api/Filmes - Adicionar novo Filme
export async function adicionarFilmeAPI(Filme) {
  try {
    const response = await fetch('/api/Filmes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Filme })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.erro || 'Erro ao adicionar Filme');
    }

    const resultado = await response.json();
    return resultado;

  } catch (error) {
    console.error('Erro ao adicionar Filme:', error);
    throw error;
  }
}

// PUT /api/Filmes/:id - Editar Filme existente
export async function editarFilmeAPI(id, Filme) {
  try {
    const response = await fetch(`/api/Filmes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Filme })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.erro || 'Erro ao editar Filme');
    }

    const resultado = await response.json();
    return resultado;

  } catch (error) {
    console.error('Erro ao editar Filme:', error);
    throw error;
  }
}

// DELETE /api/Filmes/:id - Eliminar Filme
export async function eliminarFilmeAPI(id) {
  try {
    const response = await fetch(`/api/Filmes/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.erro || 'Erro ao eliminar Filme');
    }

    return true;

  } catch (error) {
    console.error('Erro ao eliminar Filme:', error);
    throw error;
  }
}
