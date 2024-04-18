import { createContext, useState } from 'react'


export const CinemaContext = createContext()


const CinemaProvider = ({ children }) => {

    const [count, setCount] = useState(1);
    const [emailUsuario, setEmailUsuario] = useState('')

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };


    return (
        <CinemaContext.Provider value={{count, incrementCount, emailUsuario, setEmailUsuario}} >
            {children}
        </CinemaContext.Provider>
    )
}

export default CinemaProvider