import { useParams, useNavigate, useLocation } from 'react-router-dom'
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { toast } from 'react-toastify';


const ManagerCine = () => {

    const params = useParams()
    const navigation = useNavigate()
    const location = useLocation();
    const propietario = location.state;

    const [nome_cidade, setNomeCidade] = useState('')
    const [cinema_nome, setCinema] = useState('')
    const [rua, setRua] = useState('')


    const fetchCines = async (dados) => {

        if (nome_cidade.length < 6 && cinema_nome.length < 6) {
          toast.error('Nao pode ser vazio');

        }else {
            const meth = params.p
            
            try {
                console.log(propietario)
                const response = await fetch(meth == 'criar' ? 'http://127.0.0.1:5000/cidades/criar' : `http://127.0.0.1:5000/cidades/update/${cinema_nome}`, {
                    method: meth == 'criar' ? 'POST' : 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar');
                }
    
                const data = await response.json();
    
                toast.success('Cinema cadastrado com sucesso!');
    
                return data;
            } catch (error) {
                console.error('Erro ao enviar requisição:', error);
                toast.error('Erro ao cadastrar');
                throw error;
            }
            }
        };
    
        const handleSubmitCine = async (e) => {
            e.preventDefault();
            
            const formData = {
                nome_cidade,
                cinema_nome,
                propietario,
                rua
            };

            console.log(formData)
    
            try {
                const response = await fetchCines(formData);
                navigation(`/Perfil`)
                console.log('cadastrado com sucesso:', response);
    
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
            }
    };


    return (
        <div className='manager-cine-container'>
            <div className='bt-return' onClick={() => navigation(`/Perfil`)}>
                <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
            </div>

            <div className='maneger-cine'>
                <h3 className='title-cine'>{params.p == 'criar' ? 'Crie seu Cinema' : 'Editar Cinema'}</h3>
                <form onSubmit={handleSubmitCine}>
                    <div className="form-group-man-cine">
                        <div>
                            <label className="label-cad" htmlFor="nome_cidade">Nome da cidade:</label>
                            <input type="text" id="nome_cidade" value={nome_cidade} onChange={(e) => setNomeCidade(e.target.value)} required />
                        </div>
                        <div>
                            <label className="label-cad" htmlFor="cinema_nome">Nome do Cinema:</label>
                            <input type="text" id="cinema_nome" value={cinema_nome} onChange={(e) => setCinema(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-group-man-cine">
                        <div>
                            <label className="label-cad" htmlFor="propietario">Propietario:</label>
                            <input type="text" id="propietario" value={propietario} onChange={(e) => setCinema(e.target.value)} required />
                        </div>
                        <div>
                            <label className="label-cad" htmlFor="rua">Rua:</label>
                            <input type="text" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
                        </div>
                    </div>

                    <div className='but-div-cine'>
                        <button type="submit" className="submit-button-cine">{params.p == 'criar' ? 'Criar seu Cinema' : 'Editar Cinema'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ManagerCine


