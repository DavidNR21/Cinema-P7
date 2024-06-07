import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { CinemaContext } from '../../context/CinemaContext';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'


const Login = () => {

    const { setEmailUsuario } = useContext(CinemaContext)

    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({})
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate()

    const saveUserData = (u) => {
        localStorage.setItem('userData', JSON.stringify(u));
    };
    

    const fetchLogin = async (dados) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
    
            const data = await response.json();
    
            return data;
            
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            return { error: error.message };
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = {
            email: email,
            senha: password,
        };

        try {
            const response = await fetchLogin(formData);
            if (response.success == true){
                setUserData(response.data)
                setTimeout(() => {
                    setLoading(false)
                }, 2000);

                toast.success('Usuário Logado com sucesso!');
                
                setEmailUsuario(response.data.email)
                saveUserData(response.data)

                console.log('Usuário Logado com sucesso:', userData);
                navigation('/')
            }
            else{
                toast.error('Erro ao Logar usuário');
                setLoading(false)
            }
            
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }

    };


    return (
        <div className='login-container'>
            <div className='bt-return' onClick={() => navigation(`/`)}>
                <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
            </div>
            <div className='show-container'>
                <div className='background-show'>
                    <h2 className='show-title'>Bem-vindo</h2>
                    <p className='show-p'>Para usar nossos serviços realize seu Login.</p>
                    <p className='show-p-2'>promoçoes, estreias, e muito mais...</p>
                </div>
            </div>
            <div className='cadastro-container'>
                <div className="login-box">
                    <h2 className="logo-box">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" id="senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p className="recuperar-link">Esqueceu a senha? <Link to="/Redefinir/login">Clique aqui</Link></p>
                        <button type="submit">{loading ? 'Carregando...' : 'Fazer Login'}</button>
                    </form>
                    <p className="cadastro-link">Ainda não possui uma conta? <Link to="/Cadastro">Crie aqui</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

