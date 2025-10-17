// GET /api/Filmes - Carregar todos os Filmes
export async function carregarFilmesAPI() {
  try {
    const response = await fetch('/api/Filmes')
    
    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar Filmes')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar Filmes:', error)
    throw error
  }
}

// POST /api/nomes - Adicionar novo Filmes
export async function adicionarFilmeAPI(Filme) {
  try {
    const response = await fetch('/api/Filmes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Filme })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.erro || 'Erro ao adicionar Filme')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao adicionar Filme:', error)
    throw error
  }
}
