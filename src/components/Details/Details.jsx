import './styles.css'


const Details = ({ movie, isOpen, onClose }) => {

    if (!isOpen) return null;
    
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
            );
        }
        return stars;
    };


    return(
        <div className="modal-overlay-details" onClick={onClose}>
            <div className="modal-content-details" onClick={(e) => e.stopPropagation()}>
                <div className='modal-content-details-left'>
                    <div className='modal-image-details'>
                        <img src={movie.Img} alt={movie.Nome} className="modal-img-details" />
                        <div className="stars">
                            {renderStars(movie.avaliacao)}
                        </div>
                    </div>

                    <div className='modal-filme-details'>
                        <h3 className='modal-logo-details'>{movie.Nome}</h3>

                        <p className='sinopse'><strong>Sinopse:</strong> {movie.sinopse}</p>

                        <div className='modal-infos-details'>
                            <p><strong>Gênero:</strong> {movie.genero}</p>
                            <p><strong>Duração:</strong> {movie.Duracao}</p>
                            <p><strong>Lançamento:</strong> {movie.Lancamento}</p>
                        </div>
                    </div>
                </div>

                <div className='modal-content-details-right'>
                    <button className='button-details' onClick={() => window.open(movie.Trailer || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}>
                        Ver Trailer
                    </button>

                    <button className='button-details' onClick={onClose}>Fechar</button>
                </div>

            </div>
        </div>
    )
}


export default Details
