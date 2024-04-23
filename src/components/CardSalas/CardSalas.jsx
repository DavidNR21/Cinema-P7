import { useEffect, useState } from 'react';
import './styles.css';


const CardSalas = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSala, setSelectedSala] = useState(null);
    const [salaArray, setSalaArray] = useState([])


    const fetchSalas = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/sala/', {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter salas');
            }
    
            const data = await response.json();
    
            setSalaArray(data)
    
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    };

    
    useEffect(() => {
        fetchSalas()
    },[])


    const handleSalaClick = (sala) => {
        setSelectedSala(sala);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSeatClick = (lugarNumero) => {
        console.log('Assento clicado:', lugarNumero);
        console.log(salaArray)
    };


    return (
        <div className="salas-container">
            <div className="salas-grid">
                {salaArray.map(sala => (
                    <div key={sala.id} className="sala-item" onClick={() => handleSalaClick(sala)}>
                        <img src={sala.img_sala} alt={sala.nome_sala} className="sala-foto" />
                        <div className="sala-info">
                            <h3>{sala.nome_sala}</h3>
                            <p>Lugares: {sala.quantidade_de_lugares}</p>
                            <p>{sala.tipo}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedSala && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Lugares da {selectedSala.nome_sala}</h2>
                        <div className="container">
                            <div className="screen"></div>
                            <div className="rows-container">
                                {Array.from({ length: selectedSala.quantidade_de_lugares / 8 }, (_, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        {Array.from({ length: 8 }, (_, seatIndex) => {
                                            const seatNumber = rowIndex * 8 + seatIndex + 1;
                                            const isOccupied = selectedSala.lugares_reservados.includes(seatNumber);
                                            const isSelected = false;
                                            let seatClass = 'seat';
                                            if (isOccupied) seatClass += ' occupied';
                                            if (isSelected) seatClass += ' selected';
                                            return (
                                                <div
                                                    key={seatIndex}
                                                    className={seatClass}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                >
                                                    {seatNumber}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <div className="showcase">
                                <ul>
                                    <li>
                                        <div className="seat"></div>
                                        <small>Livre</small>
                                    </li>
                                    <li>
                                        <div className="seat selected"></div>
                                        <small className='selecionado' >Selecionado</small>
                                    </li>
                                    <li>
                                        <div className="seat occupied"></div>
                                        <small>Reservado</small>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardSalas;

