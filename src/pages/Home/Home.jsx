import { useEffect, useState, useContext } from "react";
//import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Filme from "../../components/BannerFilme/Filme";
import { CinemaContext } from '../../context/CinemaContext';
import './styles.css'


function Home (){

    const { count, emailUsuario } = useContext(CinemaContext)


    return(
        <div className="home">
            <Header />
            <div className="filme-div">
                <Filme />
            </div>
        </div>
    )
}


export default Home
