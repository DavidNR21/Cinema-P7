
import './styles.css'

function MeusIngressos ({ dados }){


    return(
        <section id="meus-ingressos">
            {
                dados.length === 0 ? (
                    <>
                        <p className="no-ingressos-message">Você não possui ingressos.</p>
                    </>
                ) : (
                    <>
                    <h2>Meus Ingressos</h2>
                    <div className="ingressos-container">
                        {dados.map((ingresso, index) => (
                            <div key={index} className="ingresso-card">
                                <div className="ingresso-card-details">
                                    <h3>{ingresso.filme.nome_filme}</h3>
                                    <p>Hora: {ingresso.horario}</p>
                                    <p>Cinema: {ingresso.cidade.cinema_nome}</p>
                                    <p>Sala: {ingresso.sala.nome_sala}</p>
                                    <p>Data: {ingresso.dia}</p>
                                </div>
                            <div className="ingresso-actions">
                                <button className="action-button">
                                    <i className="bx bx-info-circle" id='ingresso-icon'></i>
                                </button>
                                <button className="action-button">
                                    <i className="bx bx-download" id='ingresso-icon'></i>
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </>
                )
            }
        </section>
    )
}


export default MeusIngressos

