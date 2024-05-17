/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CinemaContext } from '../../context/CinemaContext';
import DataCards from '../../components/DataCards/DataCards';
//import ModalReserva from '../../components/ModalReserva/ModalReserva';
import './styles.css'
import Loading from '../../components/Loading/Loading';



const Details = () => {

    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun','jul', 'ago', 'set', 'out', 'nov', 'dez'];
      
    const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    const [datasDisponiveis, setDatasDisponiveis] = useState([])
    const [quantidade, setQuantidade] = useState(1)
    const [selectedHorarios, setSelectedHorarios] = useState([]);
    const { DataEscolhida, setSalaFilme, salaFilme } = useContext(CinemaContext)
    const [valor, setValor] = useState(10.00)
    const [dados, setDados] = useState([])
    const [loading, setLoading] = useState(true)

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSala, setSelectedSala] = useState(null);

    const serviceFee = 1.20;
    const horarios = ['18:00', '19:00', '20:00'];
    const parametros = useParams();


    function formatCurrency(value) {
        return value.toFixed(2).replace('.', ',');
    }


    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedHorarios(value);
        console.log(value)
    };


    function formatDate(date) {
        const mes = meses[date.getMonth()];
        const dia = date.getDate();
        const diaSemana = diasSemana[date.getDay()];
        return { mes, dia, semana: diaSemana };
    }


    async function fechtFilme(id){
        console.log(id)
        try {
            const response = await fetch(`http://127.0.0.1:5000/filme/details/${id}`);
            const result = await response.json();
            setDados(result);
            console.log(result)
            setLoading(false)
            setValor(result[0]['preco_ingresso'])
            console.log(result[0]['cidades'][0]['nome_cidade'])
        } catch (error) {
            console.log(error);
        }
    }

    async function toggleModalSala(s){
        setSalaFilme(s)
        try {
            const response = await fetch(`http://127.0.0.1:5000/sala/v2/${dados[0]['cinema']}`, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter salas');
            }
    
            const data = await response.json();

            console.log(data[0])
            handleSalaClick(data[0])
    
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    }

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
            <div className='bt-return'>
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
                                    <label className='label-res' htmlFor="nome">Quantidade de Ingressos:</label>
                                    <input type="number" id="nome" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                </div>

                                <div className="form-group-res">
                                    <span>
                                        Salas Disponiveis:
                                    </span>
                                    <div className='salas-list'>
                                        {dados[0]['salas'].map((sala, index) => (
                                            <div key={index} className='salas-list-item' onClick={() => toggleModalSala(sala.nome_sala, sala)}>
                                                <span>{sala.nome_sala}</span>
                                                <span>{sala.tipo}</span>
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
                                            <span>Rua endereço num</span>
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
                                            <div>
                                                <p>{`10`}</p>
                                            </div>

                                            <div>
                                                <p>{`12`}</p>
                                            </div>
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

                                    <Link to='/' className='link'>
                                        <div className='continuar-compra'>
                                            <div className='continuar-compra-bt' >
                                                <p>
                                                    Continuar
                                                </p>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
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
                    </>
                )
            }
            
        </div>
    )
}

export default Details
