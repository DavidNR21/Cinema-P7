import { useNavigate } from 'react-router-dom'
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { toast } from 'react-toastify';


const ManagerSalas = () => {
    const navigation = useNavigate()

    const [nome_sala, setNomeSala] = useState('')
    const [cinema_nome, setCinema] = useState('')
    const [quantidade_de_lugares, setQuantidadeLugares] = useState(40)
    const [img, setImg] = useState('')
    const [tipo, setTipo] = useState('')


    const fetchCines = async (dados) => {

        if (nome_sala.length < 6 && cinema_nome.length < 6) {
          toast.error('Nao pode ser vazio');

        }else {
            
            try {
                const response = await fetch('http://127.0.0.1:5000/sala/criar', {
                    method: 'POST',
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
    
        const handleSubmitsSala = async (e) => {
            e.preventDefault();
            
            const formData = {
                nome_sala,
                cinema_nome,
                tipo,
                img,
                quantidade_de_lugares
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

            <div className='maneger-sala'>
                <h3 className='title-cine'>Crie Sala</h3>
                <form onSubmit={handleSubmitsSala}>
                    <div className="form-group-man-sala">
                        <div>
                            <label className="label-cad" htmlFor="nome_cidade">Nome da sala:</label>
                            <input type="text" id="nome_cidade" value={nome_sala} onChange={(e) => setNomeSala(e.target.value)} required />
                        </div>
                        <div>
                            <label className="label-cad" htmlFor="cinema_nome">Nome do Cinema:</label>
                            <input type="text" id="cinema_nome" value={cinema_nome} onChange={(e) => setCinema(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-group-man-sala">
                        <div>
                            <label className="label-cad" htmlFor="propietario">Quantidade de lugares:</label>
                            <input type="number" id="propietario" value={quantidade_de_lugares} onChange={(e) => setQuantidadeLugares(e.target.value)} required />
                        </div>
                        <div>
                            <label className="label-cad" htmlFor="rua">Tipo de sala:</label>
                            <input type="text" id="rua" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
                        </div>
                        <div>
                            <label className="label-cad" htmlFor="rua">Imagem:</label>
                            <input type="text" id="rua" value={img} onChange={(e) => setImg(e.target.value)} required />
                        </div>
                    </div>

                    <div className='but-div-sala'>
                        <button type="submit" className="submit-button-cine">Criar Sala</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ManagerSalas

