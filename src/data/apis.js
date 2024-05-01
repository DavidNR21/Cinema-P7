
export const buscar_filmes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/filme/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        const json = await response.json();
        const status = response.status

        return {status: status, data : json};
        
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        return { error: error.message };
    }
}


export const buscar_filmes_por_cinema = async (c) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/filme/${c}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }

        const json = await response.json();
        const status = response.status

        return {status: status, data : json};
        
    } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        return { error: error.message };
    }
}

