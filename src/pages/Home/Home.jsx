import { useEffect, useState, useContext } from "react";
//import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Filme from "../../components/BannerFilme/Filme";
import { CinemaContext } from '../../context/CinemaContext';
import Select from "react-dropdown-select";
import './styles.css'


function Home (){

    const { count, emailUsuario } = useContext(CinemaContext)
    const [value, setValue] = useState([])

    const ar = [{id: 1, nome : "teste1"}, {id: 2, nome : "test2"} ,{id: 3, nome : "teste3"}]

    return(
        <div className="home">
            <Header />
            <div className="dropdown">
                <div className="drop-div">
                    <Select placeholder="Selecione uma cidade"
                        options={ar}
                        labelField="nome"
                        valueField="id"
                        className="drop"
                        onChange={e => setValue(e)}
                    />
                </div>
                <div className="drop-div">
                    <Select placeholder="Selecione um cinema"
                        options={ar}
                        labelField="nome"
                        valueField="id"
                        className="drop"
                        onChange={e => setValue(e)}
                    />
                </div>
            </div>
            <div className="filme-div">
                <Filme />
            </div>
        </div>
    )
}


export default Home
