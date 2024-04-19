import { useState } from 'react';
import './styles.css';


const CardSalas = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSala, setSelectedSala] = useState(null);

    const salas = [
        {
            id: 1,
            nome: 'Sala 1',
            foto: 'https://ogimg.infoglobo.com.br/in/24308772-36d-ad0/FT1086A/86856180_RSSala-de-cinema-do-Kinoplex-Platinum-Rio-Sul-com-cadeiras-que-deitamFoto-Divulgacao-1.jpg',
            lugares: 40,
            tipo: '2D',
            lugaresReservados: [1, 2, 3, 10]
        },
        {
            id: 2,
            nome: 'Sala 2',
            foto: 'https://ogimg.infoglobo.com.br/in/24308772-36d-ad0/FT1086A/86856180_RSSala-de-cinema-do-Kinoplex-Platinum-Rio-Sul-com-cadeiras-que-deitamFoto-Divulgacao-1.jpg',
            lugares: 48,
            tipo: '3D',
            lugaresReservados: [1, 2, 3, 10]
        },
        {
            id: 3,
            nome: 'Sala 3',
            foto: 'https://veja.abril.com.br/wp-content/uploads/2016/10/cinema1.jpg?quality=90&strip=info&w=720&h=440&crop=1',
            lugares: 56,
            tipo: 'IMAX',
            lugaresReservados: [1, 2, 3, 10]
        }
    ];


    const handleSalaClick = (sala) => {
        setSelectedSala(sala);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSeatClick = (lugarNumero) => {
        console.log('Assento clicado:', lugarNumero);
    };


    return (
        <div className="salas-container">
            <div className="salas-grid">
                {salas.map(sala => (
                    <div key={sala.id} className="sala-item" onClick={() => handleSalaClick(sala)}>
                        <img src={sala.foto} alt={sala.nome} className="sala-foto" />
                        <div className="sala-info">
                            <h3>{sala.nome}</h3>
                            <p>Lugares: {sala.lugares}</p>
                            <p>{sala.tipo}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedSala && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Lugares da {selectedSala.nome}</h2>
                        <div className="container">
                            <div className="screen"></div>
                            <div className="rows-container">
                                {Array.from({ length: selectedSala.lugares / 8 }, (_, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        {Array.from({ length: 8 }, (_, seatIndex) => {
                                            const seatNumber = rowIndex * 8 + seatIndex + 1;
                                            const isOccupied = selectedSala.lugaresReservados.includes(seatNumber);
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

