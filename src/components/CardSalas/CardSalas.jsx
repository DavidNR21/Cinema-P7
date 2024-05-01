import { useState } from 'react';
import './styles.css';


const CardSalas = ({ salaArray }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSala, setSelectedSala] = useState(null);


    const handleSalaClick = (sala) => {
        setSelectedSala(sala);
        console.log(sala.sala.quantidade_de_lugares)
        setModalOpen(true);
    };

    const closeModal = () => {
        console.log(selectedSala.sala.quantidade_de_lugares)
        setModalOpen(false);
    };

    const handleSeatClick = (lugarNumero) => {
        console.log('Assento clicado:', lugarNumero);
    };


    return (
        <div className="salas-container">
            <div className="salas-grid">
                {salaArray.map(item => (
                    <div key={item.sala.id} className="sala-item" onClick={() => handleSalaClick(item)}>
                        <img src={item.sala.img_sala} alt={item.sala.nome_sala} className="sala-foto" />
                        <div className="sala-info">
                            <h3>{item.sala.nome_sala}</h3>
                            <p>Lugares: {item.sala.quantidade_de_lugares}</p>
                            <p>{item.sala.tipo}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedSala && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Lugares da {selectedSala.sala.nome_sala}</h2>
                        <div className="container">
                            <div className="screen"></div>
                            <div className="rows-container">
                                {Array.from({ length: selectedSala.sala.quantidade_de_lugares / 8 }, (_, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        {Array.from({ length: 8 }, (_, seatIndex) => {
                                            const seatNumber = rowIndex * 8 + seatIndex + 1;
                                            const isOccupied = selectedSala.reservas.includes(seatNumber);
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

