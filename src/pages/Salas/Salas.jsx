
import './styles.css'; // Arquivo de estilos CSS
import Header from '../../components/Header/Header';
import CardSalas from '../../components/CardSalas/CardSalas';

const Salas = () => {
    // Array de salas de cinema (simulado)

    return (
        <>
            <Header />
            <h2 className="salas-title">Salas Disponíveis</h2>
            <div className="salas-container">
                <CardSalas />
            </div>
        </>
    );
}

export default Salas;
