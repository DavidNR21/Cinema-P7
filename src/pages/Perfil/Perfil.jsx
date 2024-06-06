import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import DadosPessoais from '../../components/DadosPessoais/DadosPessoais';
import MeusIngressos from '../../components/MeusIngressos/MeusIngressos';
import { buscar_reservas_por_usuario } from '../../data/apis';


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
        navigation('/login')
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
            case 'historico':
                return (
                    <section id="historico">
                        <h2>Histórico</h2>
                        <p>Veja seu histórico de atividades.</p>
                    </section>
                )
            default:
                return null;
        }
    }

    useEffect(() => {
        const userData = getUserData()

        setUsername(userData['nome'])
        setIsAdmin(useState['admin'])
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
                            !isAdmin ? <span className='op'>Meu Cinema</span> : ''
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
