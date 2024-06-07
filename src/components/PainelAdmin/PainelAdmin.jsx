
import { useState } from 'react'
import './styles.css'
import ModalEdicao from '../ModalEdicao/ModalCine';


const PainelAdmin = ({ dados }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState('')
    const closeModal = () => setModalOpen(false);

    const OpenModal = (t) => {
        setType(t)
        setModalOpen(true)
    }


    const cines = [
        {
            "cinema_nome": "Cine-Guedes",
            "nome_cidade": "Patos-PB",
            "propietario" : "A",
            "rua" : "Rua pedro firmino 1"
        },
        {
            "cinema_nome": "Multicines",
            "nome_cidade": "Patos-PB",
            "propietario" : "B",
            "rua" : "Rua pedro firmino 2"
        },
        {
            "cinema_nome": "Multicines",
            "nome_cidade": "Patos-PB",
            "propietario" : "B",
            "rua" : "Rua pedro firmino 2"
        },
        {
            "cinema_nome": "Multicines",
            "nome_cidade": "Patos-PB",
            "propietario" : "B",
            "rua" : "Rua pedro firmino 2"
        },
        {
            "cinema_nome": "Multicines",
            "nome_cidade": "Patos-PB",
            "propietario" : "B",
            "rua" : "Rua pedro firmino 2"
        }
    ]

    return (
        <section id="adm">
            <h2>Meu Cinema:</h2>
            <div className="adm-container">
                <div className="adm-item-infos">
                {cines.map((ingresso, index) => (
                    <div key={index} className="adm-card">
                        <div className="ingresso-card-details">
                            <h3>{ingresso.cinema_nome}</h3>
                            <p>Rua: {ingresso.rua}</p>
                            <p>Cidade: {ingresso.nome_cidade}</p>
                            <p>Propietario: {ingresso.propietario}</p>
                        </div>
                        <div className="ingresso-actions">
                            <button className="action-button">
                                <i className="bx bxs-trash-alt" id='ingresso-icon'></i>
                            </button>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="adm-item-modals">
                    <div className='adm-modals'>
                        <button className='button-details' onClick={() => OpenModal('Adicionar Cinema')}>
                            Adicionar Cinema
                        </button>

                        <button className='button-details' onClick={() => OpenModal('Adicionar Filme')}>Adicionar Filme</button>

                        <button className='button-details' onClick={() => OpenModal('Editar Filme')}>
                            Editar Filme
                        </button>

                        <button className='button-details' onClick={() => OpenModal('Editar Cinema')}>
                            Editar Cinema
                        </button>
                    </div>
                </div>
                <ModalEdicao type={type} isOpen={modalOpen} onClose={closeModal} />
            </div>
        </section>
    )
}


export default PainelAdmin
