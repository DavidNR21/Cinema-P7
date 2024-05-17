import { useNavigate } from 'react-router-dom';
//import Container from "../../components/Container/Container";
import './styles.css'


function Filme ({ filmesArray }){

  const navigation = useNavigate()



  return (
    <div className="filmes-container">
      {filmesArray.map(filme => (
        <div key={filme.id} className="filme-card">
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

            <div className='ingresso-div' onClick={() => navigation(`Details/${filme.id}`)}>
              <span>Comprar Ingresso</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    
}


export default Filme


