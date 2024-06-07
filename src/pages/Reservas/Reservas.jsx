/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CinemaContext } from '../../context/CinemaContext';
import { toast } from 'react-toastify';
import DataCards from '../../components/DataCards/DataCards';
import './styles.css'
import Loading from '../../components/Loading/Loading';
import ModalReserva from '../../components/ModalReserva/ModalReserva';



const Reservas = () => {

    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun','jul', 'ago', 'set', 'out', 'nov', 'dez'];
      
    const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    const [datasDisponiveis, setDatasDisponiveis] = useState([])
    const [quantidade, setQuantidade] = useState(1)
    const [selectedHorarios, setSelectedHorarios] = useState([]);
    const { DataEscolhida, setSalaFilme, salaFilme } = useContext(CinemaContext)
    const [idSala, setIdSala] = useState('')
    const [valor, setValor] = useState(10.00)
    const [dados, setDados] = useState([])
    const [loading, setLoading] = useState(true)
    const serviceFee = 1.20;
    const horarios = ['17:45', '19:00', '21:15'];
    const parametros = useParams();
    const [selectedSala, setSelectedSala] = useState([]);
    const [poltronas, setPoltronas] = useState([])
    const navigation = useNavigate()

    // modal
    const [modalOpen, setModalOpen] = useState(false);
    const [Sala, setSala] = useState({});



    function formatCurrency(value) {
        return value.toFixed(2).replace('.', ',');
    }


    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedHorarios(value);
        //console.log(value)
    };


    function formatDate(date) {
        const mes = meses[date.getMonth()];
        const dia = date.getDate();
        const diaSemana = diasSemana[date.getDay()];
        return { mes, dia, semana: diaSemana };
    }


    async function fechtFilme(id){
        try {
            const response = await fetch(`http://127.0.0.1:5000/filme/details/${id}`);
            const result = await response.json();
            setDados(result);
            setLoading(false)
            setValor(result[0]['preco_ingresso'])
            //console.log(result[0])
            ToggleSalas(result[0]['cinema'])

        } catch (error) {
            console.log(error);
        }
    }

    function toggleModalSala(s){
        setSalaFilme(s.sala.nome_sala)
        setIdSala(s.sala.id)
        //console.log(s)
        setSala(s)
        setModalOpen(true)
    }


    const closeModal = () => {
        setModalOpen(false);
    };



    const ToggleSalas = async (cine) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/sala/v2/${cine}`, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter salas');
            }
    
            const data = await response.json();

            //console.log(data)
            setSelectedSala(data)
    
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    };

    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    };

    
    async function FazerReserva (){

        const userData = getUserData();

        if (userData) {
            //toast.success('Usuário Logado com sucesso!');
            console.log(userData)

            if (poltronas.length != quantidade){
                toast.error('Numeros de cadeiras e ingressos são diferentes.')
            }

            else{

                const DATA = {
                    nome_usuario : userData['nome'],
                    nome_sala : salaFilme,
                    nome_filme : dados[0]['nome_filme'],
                    nome_cinema : dados[0]['cidades'][0]['cinema_nome'],
                    horario : selectedHorarios,
                    cadeiras : poltronas,
                    ingressos : quantidade,
                    dia : DataEscolhida,
                    id_sala : idSala
                }
    
                console.log(DATA)

                try {
                    const response = await fetch('http://127.0.0.1:5000/reservas/criar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(DATA)
                    });
                    
                    if (!response.ok) {
                        throw new Error('Erro ao fazer reserva');
                    }
            
                    const data = await response.json();
            
                    toast.success('Reserva feita com sucesso!');
            
                    return data;
            
                } catch (error) {
                    console.error('Erro ao enviar requisição:', error);
            
                    toast.error('Erro ao Fazer reserva');
            
                    throw error;
                }

            }

        } else {
            console.log('No user data found in localStorage');
            toast.error('Faça Login para Seguir');
            navigation(`/Login`)
        }
    }


    ////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        let datas = [];

        let hoje = new Date();

        for (let i = 0; i < 5; i++) {
            let dataFutura = new Date(hoje);
            dataFutura.setDate(hoje.getDate() + i);
            datas.push(formatDate(dataFutura));
        }

        setDatasDisponiveis(datas)

        fechtFilme(parametros.id)

    },[])


    return(
        <div className='details-container'>
            <div className='bt-return' onClick={() => navigation(`/`)}>
                <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
            </div>

            {
                loading ? (
                    <div className='load'>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className='left-content'>
                            <div className='datas-div'>
                                <p>
                                    Escolha uma Data.
                                </p>
                                <DataCards itens={datasDisponiveis} />
                            </div>

                            <hr />

                            <div className='reservas-div'>
                                <p className='cidade-infos'>
                                    {`${dados[0]['cidades'][0]['nome_cidade']} - ${dados[0]['cidades'][0]['cinema_nome']}`}
                                </p>

                                <div className="form-group-res">
                                    <label className='label-res' htmlFor="qt">Quantidade de Ingressos:</label>
                                    <input type="number" id="qt" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                </div>

                                <div className="form-group-res">
                                    <span>
                                        Salas Disponiveis:
                                    </span>
                                    <div className='salas-list'>
                                        {selectedSala.map((sala, index) => (
                                            <div key={index} className='salas-list-item' onClick={() => toggleModalSala(sala)}>
                                                <span>{sala.sala.nome_sala}</span>
                                                <span>{sala.sala.tipo}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group-res">
                                    <span>
                                        Horarios Disponiveis:
                                    </span>
                                    <div className="horarios-comp">
                                        {horarios.map(horario => (
                                            <div key={horario} className="horario-item">
                                                <input
                                                    type="checkbox"
                                                    id={horario}
                                                    value={horario}
                                                    checked={selectedHorarios.includes(horario)}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={horario} className='H'>{horario}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='rigth-content-details'>
                                <div className='rigth-content-info-filme'>
                                    <img src={dados[0]['imagem']} alt={'t'} className="img-details" />
                                    <div className='informaçoes-details'>
                                        <p>
                                            {dados[0]['nome_filme']}
                                        </p>
                                        <div className='dublagem'>
                                            <span>
                                                {dados[0]['dub_leg']}
                                            </span>
                                        </div>
                                        <div className='infos-cinema'>
                                            {dados[0]?.cidades.map((cidade, index) => (
                                                <span key={index}>{cidade.cinema_nome}</span>
                                            ))}
                                            {dados[0]?.cidades.map((cidade, index) => (
                                                <span key={index}>{cidade.nome_cidade}</span>
                                            ))}
                                            {dados[0]?.cidades.map((cidade, index) => (
                                                <span key={index}>{cidade.rua}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <hr className='linha' />

                                <div className='dias-salas-horario'>
                                    <p>{`${DataEscolhida} - ${selectedHorarios}`}</p>
                                    <span>{`${dados[0]['cidades'][0]['cinema_nome']} - ${salaFilme}`}</span>
                                </div>

                                <hr className='linha' />

                                <div className='ingressso-preco'>
                                    <p className='Q-ingesso'>{`${quantidade} Ingresso(s)`}</p>
                                    <span>Detalhes:</span>

                                    <div className='lugares-div'>
                                        <p className='Q-lugares'>{`${quantidade} Poltrona(s)`}</p>
                                        <div className='poltronas'>
                                            {poltronas.length > 0 ? (
                                                poltronas.map((poltrona, index) => (
                                                    <div key={index}>
                                                        <p>{poltrona}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <span>Nenhuma poltrona disponível</span>
                                            )}
                                        </div>
                                    </div>

                                    <hr className='linha' />

                                    <div className="resumo-compra">
                                        <div className="resumo-left">
                                            <span>{`${quantidade} x Item`}</span>
                                            <span>Serviço</span>
                                            <p>Total da Compra:</p>
                                        </div>
                                        <div className="resumo-right">
                                            <span>{formatCurrency(valor)}</span>
                                            <span>{formatCurrency(serviceFee)}</span>
                                            <p>{`R$ ${formatCurrency(quantidade * (valor + serviceFee))}`}</p>
                                        </div>
                                    </div>

                                    <div className='continuar-compra' onClick={FazerReserva}>
                                        <div className='continuar-compra-bt' >
                                            <p>
                                                Continuar
                                             </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <ModalReserva modalOpen={modalOpen} 
                            closeModal={closeModal} 
                            selectedSala={Sala} 
                            q={quantidade} 
                            setPol={setPoltronas} 
                            pol={poltronas} 
                        />
                    </>
                )
            }
            
        </div>
    )
}

export default Reservas
