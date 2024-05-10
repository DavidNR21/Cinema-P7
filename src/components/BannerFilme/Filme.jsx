//import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
//import Container from "../../components/Container/Container";
import './styles.css'


function Filme ({ filmesArray }){
    

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
              <p className="filme-detalhes">Sala: {filme.sala.nome_sala}</p>
            </div>

            <div className='ingresso-div'>
              <Link to='/Details'>
                <span>Comprar Ingresso</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    
}


export default Filme


