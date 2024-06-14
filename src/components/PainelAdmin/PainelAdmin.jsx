import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';


const PainelAdmin = ({ dados, propi }) => {

    const navigation = useNavigate()
    const [cines, setCines] = useState(dados)


    const DeleteCidade =  async (n) =>{
        try {
            const response = await fetch(`http://127.0.0.1:5000/cidades/delete/${n}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar');
            }

            const data = await response.json();

            toast.success('Deletado cadastrado com sucesso!');

            setCines(cines.filter(cinema => cinema.cinema_nome !== n))

            return data;
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            toast.error('Erro ao Deletar');
            throw error;
        }
    }

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
                            <button className="action-button" onClick={() => navigation(`/Manager/cine/${propi}/edit`)}>
                                <i className='bx bxs-pencil' id='ingresso-icon'></i>
                            </button>
                            <button className="action-button" onClick={() => DeleteCidade(ingresso.cinema_nome)}>
                                <i className="bx bxs-trash-alt" id='ingresso-icon'></i>
                            </button>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="adm-item-modals">
                    <div className='adm-modals'>
                        <button className='button-details' onClick={() => navigation(`/Manager/cine/${propi}/criar`, {state: propi})}>
                            Adicionar Cinema
                        </button>

                        <button className='button-details' onClick={() => navigation('/Manager/filme/criar')}>Adicionar Filme</button>

                        <button className='button-details' onClick={() => navigation('/Manager/filme/edit')}>
                            Editar Filme
                        </button>

                        <button className='button-details' onClick={() => navigation(`/Manager/salas`)}>
                            Adicionar Salas
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}


export default PainelAdmin
