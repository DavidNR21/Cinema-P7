import { useState, useContext } from 'react';
import { CinemaContext } from '../../context/CinemaContext';
import './styles.css'


const DataCards = ({ itens }) => {

    const [selectedIndex, setSelectedIndex] = useState(null);

    const { setDataEscolhida } = useContext(CinemaContext)


    const ToggleData = (dia, mes, index) => {
        let hj = new Date()
        setSelectedIndex(index)
        setDataEscolhida(`${dia}/${mes}/${hj.getFullYear()}`)
    }

    return(
        <div className='datas-comp'>
            {itens.map((filme, index) => (
                <div key={index} className={`item-datas ${selectedIndex === index ? 'item-datas-selected' : ''}`} onClick={() => ToggleData(filme.dia, filme.mes, index)}>
                    <span className='mes'>{filme.mes}</span>
                    <span className='dia'>{filme.dia}</span>
                    <span className='semana'>{filme.semana}</span>
                </div>
            ))}
        </div>
    )
}

export default DataCards

