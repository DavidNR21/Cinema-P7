import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { buscar_Filmes_Detalhes } from '../../data/apis';
import Details from '../Details/Details';
import './styles.css'


function Filme ({ filmesArray }){

  const navigation = useNavigate()
  const [modalOpen, setModalOpen] = useState(false);
  const [movie, setMovie] = useState({})
  const closeModal = () => setModalOpen(false);


  const openModal = async (n) => {
    try {
      const response = await buscar_Filmes_Detalhes(n)
      if(response.success){
        setMovie(response.data[0])
        setModalOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="filmes-container">
      {filmesArray.map(filme => (
        <div key={filme.id} className="filme-card" onClick={() => openModal(filme.nome_filme)}>
          <img src={filme.imagem} alt={filme.nome_filme} className="filme-imagem" />
          <div className="filme-info">
            <div className='titulo-div'>
              <h3 className="filme-titulo">{filme.nome_filme} </h3>
            </div>

            <div className='detalhes-div'>
              <p className="filme-detalhes">Duração: {filme.duracao}</p>
              <p className="filme-detalhes">Horário: {filme.horarios}</p>
            </div>

            <div className='infos-div'>
              <p className="filme-detalhes">Preço: R${filme.preco_ingresso}</p>
            </div>

            <div className='ingresso-div' onClick={() => navigation(`Reservas/${filme.id}`)}>
              <span>Comprar Ingresso</span>
            </div>
          </div>
        </div>
      ))}
      <Details movie={movie} isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
    
}


export default Filme


