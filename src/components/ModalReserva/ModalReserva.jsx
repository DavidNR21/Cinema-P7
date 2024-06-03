
import './styles.css'


const ModalReserva = ({ closeModal, modalOpen, selectedSala, q, setPol, pol }) => {

    const handleSeatClick = (poltrona) => {
        setPol((prevPoltronas) => {
          if (prevPoltronas.includes(poltrona)) {
            // Remove the item if it is already in the array
            return prevPoltronas.filter((item) => item !== poltrona);
          } else {
            // Add the item if it is not in the array
            return [...prevPoltronas, poltrona];
          }
        });
        console.log(`assento numero: ${poltrona}, ${q}, ${pol}`)
    };


    if (!modalOpen || !selectedSala) return null;


    return(
        <>
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
                                        const isSelected = pol.includes(seatNumber);
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
        </>
    )
}


export default ModalReserva
