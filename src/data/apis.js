
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


export const TokenApi = 'godEJzIkDkUucUuZi4tO2H86uQLOburd'


export const buscar_Filmes_Detalhes = async (n) => {
    try {
        const response = await fetch(`https://api.baserow.io/api/database/rows/table/302774/?user_field_names=true&search=${n}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${TokenApi}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        return {success: true, data : json.results}

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

