import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { CinemaContext } from '../../context/CinemaContext';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'


const Login = () => {

    const { setEmailUsuario } = useContext(CinemaContext)

    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({})
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
            </form>
            <div className="forgot-password">
                <a href="#">Esqueceu a senha?</a>
            </div>
        </div>
    );
};

export default Login;

