import { useEffect, useContext, useState } from 'react';
import './styles.css'; // Arquivo de estilos CSS
import Header from '../../components/Header/Header';
import CardSalas from '../../components/CardSalas/CardSalas';
import Loading from '../../components/Loading/Loading'
import { CinemaContext } from '../../context/CinemaContext';




const Salas = () => {

    const { cinema } = useContext(CinemaContext)

    const [salaArray, setSalaArray] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchSalas = async (cine) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/sala/v2/${cine}`, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter salas');
            }
    
            const data = await response.json();

            console.log(data)
    
            setSalaArray(data)
            setLoading(false)
    
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    };


    useEffect(() => {
        fetchSalas(cinema)
    },[cinema])


    return (
        <>
            <Header />
            <h2 className="salas-title">Salas Disponíveis</h2>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className="salas-container">
                        <CardSalas salaArray={salaArray}/>
                    </div>
                )
            }
        </>
    );
}

export default Salas;
