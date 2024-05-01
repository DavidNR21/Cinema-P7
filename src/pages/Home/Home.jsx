import { useEffect, useState, useContext } from "react";
//import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Filme from "../../components/BannerFilme/Filme";
import { CinemaContext } from '../../context/CinemaContext';
import { buscar_filmes, buscar_filmes_por_cinema } from "../../data/apis";
import Select from "react-dropdown-select";
import Loading from "../../components/Loading/Loading";
import './styles.css'


function Home (){

    const { setCinema, setCidade } = useContext(CinemaContext)

    const [filme, setFilme] = useState([])
    const [arrayCidade, setArrayCidade] = useState([])
    const [arrayCinema, setArrayCinema] = useState([])
    const [loading, setLoading] = useState(true)


    const fecthCidades = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/cidades/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
    
            const data = await response.json();

            setArrayCidade(data)

            return data;
            
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    }

    const fecthCinema = async (c) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/cidades/${c}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
    
            const data_cinema = await response.json();
            setArrayCinema(data_cinema)
            setCidade(c)
            console.log(data_cinema)
            
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    }

    const iniciar = async () => {
        
        const filmes = await buscar_filmes()

        setFilme(filmes.data)
        setLoading(false)

    }

    const filmes_especificos = async (cine) => {
        setLoading(true)

        const filmesApi = await buscar_filmes_por_cinema(cine)
        setCinema(cine)

        setFilme(filmesApi.data)
        setLoading(false)
    }


    useEffect(() => {
        console.log('carregou...')
        iniciar()
        fecthCidades()
    },[])

    return(
        <div className="home">
            <Header />
            <div className="dropdown">
                <div className="drop-div">
                    <Select placeholder="-- Selecione uma cidade --"
                        options={arrayCidade}
                        color="black"
                        labelField="nome_cidade"
                        valueField="nome_cidade"
                        className="drop"
                        onChange={e => fecthCinema(e[0].nome_cidade)}
                    />
                </div>
                <div className="drop-div">
                    <Select placeholder="-- Selecione um cinema --"
                        options={arrayCinema}
                        color="black"
                        labelField="cinema_nome"
                        valueField="id"
                        className="drop"
                        onChange={e => filmes_especificos(e[0].cinema_nome)}
                    />
                </div>
            </div>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className="filme-div">
                        <Filme filmesArray={filme} />
                    </div>
                )
            }
        </div>
    )
}


export default Home
