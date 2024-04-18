import { useEffect, useState, useContext } from "react";
//import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Filme from "../../components/BannerFilme/Filme";
import { CinemaContext } from '../../context/CinemaContext';
import './styles.css'


function Home (){

    const { count, emailUsuario } = useContext(CinemaContext)

    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const [selectedDay, setSelectedDay] = useState(0);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        console.log(count, 'aqui count')
        console.log(emailUsuario)
    };

    useEffect(() => {
        console.log(selectedDay)
    }, [selectedDay])


    return(
        <div className="home">
            <Header />
            <div className="container-dias">
                <h3 className="subtitle">
                    ESCOLHA UMA DATA PARA ASSISTIR UM FILME:
                </h3>
                <hr></hr>
                <div className="diasContainer">
                    {diasSemana.map((dia, index) => (
                        <div
                            key={index}
                            className={`dia ${selectedDay === index ? 'selected' : ''}`}
                            onClick={() => handleDayClick(index)}
                        >
                            <span>{dia}</span>
                            <span className="numero-dia">{index + 10}</span>
                            <span>Abr</span>
                        </div>
                    ))}
                </div>
            </div>
            <Filme />
        </div>
    )
}


export default Home
