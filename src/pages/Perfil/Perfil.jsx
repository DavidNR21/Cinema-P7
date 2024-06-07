import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import DadosPessoais from '../../components/DadosPessoais/DadosPessoais';
import MeusIngressos from '../../components/MeusIngressos/MeusIngressos';
import { buscar_reservas_por_usuario } from '../../data/apis';
import PainelAdmin from '../../components/PainelAdmin/PainelAdmin';


function Perfil (){

    const [visibleSection, setVisibleSection] = useState('meus dados')
    const [username, setUsername] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [DATA, setDATA] = useState({})
    const [ingressos, setIngressos] = useState([])
    const navigation = useNavigate()

    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    const ingressos_user = async (n) => {
        const IngressosApi = await buscar_reservas_por_usuario(n)

        setIngressos(IngressosApi.data)
    }

    const handleHome = () => {
        navigation(`/`)
    };


    const handleLogout = () => {
        localStorage.removeItem('userData')
        navigation('/')
    };


    const renderSection = () => {

        switch (visibleSection) {
            case 'meus dados':
                return (
                    <DadosPessoais dados={DATA} />
                )
            case 'meusIngressos':
                return (
                    <MeusIngressos dados={ingressos} />
                )
            case 'adm':
                return (
                    <PainelAdmin dados={DATA}/>
                )
            default:
                return null;
        }
    }

    useEffect(() => {
        const userData = getUserData()

        setUsername(userData['nome'])
        setIsAdmin(userData['admin'])
        setDATA(userData)

        ingressos_user(userData['nome'])
    },[])

    return(
        <div className="perfil-container">
            <header className="profile-header">
                <div className="header-content">
                    <h1>Olá, {username}</h1>
                    <div className="nav-menu">
                        <span className='op' onClick={() => setVisibleSection('meus dados')}>Dados pessoais</span>
                        <span className='op' onClick={() => setVisibleSection('meusIngressos')}>Meus ingressos</span>
                        {
                            isAdmin ? <span className='op' onClick={() => setVisibleSection('adm')}>Meu Cinema</span> : ''
                        }
                        <span className='op' onClick={handleHome}>Home</span>
                        <span className='op' onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </header>

            <main className="profile-main">
                {renderSection()}
            </main>

        </div>
    )
}


export default Perfil
