//import { useEffect, useState } from "react";
//import Container from "../../components/Container/Container";
import './styles.css'


function Filme (){


  const filmes = [
        {
          "dub_leg": "DUB",
          "duracao": "2h 18m",
          "horarios": "19:00",
          "id": 1,
          "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I",
          "nome_filme": "O Preço do Amanhã",
          "preco_ingresso": 15.0,
          "sala": {
            "id": 1,
            "nome_sala": "sala superior",
            "quantidade_de_lugares": 30
          }
        },
        {
          "dub_leg": "DUB",
          "duracao": "2h 21m",
          "horarios": "17:00",
          "id": 2,
          "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-1t6PkPosP80FBAsRzIM_SuZGdcY6svaMfWP8X9BdiqNUvyQ8",
          "nome_filme": "A Origem",
          "preco_ingresso": 17.5,
          "sala": {
            "id": 3,
            "nome_sala": "sala 3D",
            "quantidade_de_lugares": 40
          }
        },
        {
            "dub_leg": "DUB",
            "duracao": "2h 21m",
            "horarios": "17:00",
            "id": 3,
            "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS-1t6PkPosP80FBAsRzIM_SuZGdcY6svaMfWP8X9BdiqNUvyQ8",
            "nome_filme": "A Origem",
            "preco_ingresso": 17.5,
            "sala": {
              "id": 3,
              "nome_sala": "sala 3D",
              "quantidade_de_lugares": 40
            }
        },
        {
            "dub_leg": "DUB",
            "duracao": "2h 18m",
            "horarios": "19:00",
            "id": 4,
            "imagem": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I",
            "nome_filme": "O Preço do Amanhã",
            "preco_ingresso": 15.0,
            "sala": {
              "id": 1,
              "nome_sala": "sala superior",
              "quantidade_de_lugares": 30
            }
          }
    ];
    

  return (
    <div className="filmes-container">
      {filmes.map(filme => (
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
              <span>Comprar Ingresso</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
    
}


export default Filme


