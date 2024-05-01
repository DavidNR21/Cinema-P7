import { createContext, useState } from 'react'


export const CinemaContext = createContext()


const CinemaProvider = ({ children }) => {

    const [count, setCount] = useState(1);
    const [emailUsuario, setEmailUsuario] = useState('')
    const [cidade, setCidade] = useState('')
    const [cinema, setCinema] = useState('')

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };


    return (
        <CinemaContext.Provider value={{
            count,
            setCidade,
            cidade,
            incrementCount,
            cinema,
            setCinema,
            emailUsuario,
            setEmailUsuario,
        }} >
            {children}
        </CinemaContext.Provider>
    )
}

export default CinemaProvider