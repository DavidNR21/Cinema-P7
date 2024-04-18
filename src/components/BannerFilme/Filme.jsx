//import { useEffect, useState } from "react";
//import Container from "../../components/Container/Container";
import './styles.css'


function Filme (){

    const i = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1wJblWO1WGI4xTI7s5rzmTqgA4tNCMz5WMw1jvxl0JpA-JN8I'


    return(
        <div className='card'>
            <div className='banner'>
                <img src={i} alt="Descrição da imagem" className='imagem-div' />
            </div>
        </div>
    )
}


export default Filme


