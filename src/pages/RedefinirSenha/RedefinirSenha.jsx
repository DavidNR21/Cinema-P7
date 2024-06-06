import { useEffect, useState } from 'react';
import './styles.css';
import { atualizar_usuario } from '../../data/apis';


function RedefinirSenha() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [DATA, setDATA] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem!')
            return
        }
        // Adicione a lógica para redefinir a senha aqui (API call etc.)

        const updateData = {
            metodo: 'senha',
            senha: password
        };

        atualizar_usuario(DATA['id'], updateData).then(response => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log('Usuário atualizado:', response.data);
                setMessage('Senha redefinida com sucesso!')
            }
        })
        .catch(error => {
            console.error('Erro inesperado:', error)
        });
    };

    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    useEffect(() => {
        const userData = getUserData()

        setDATA(userData)
    },[])

    return (
        <div className="reset-container">
            <div className="reset-box">
                <h2>Redefinir Senha</h2>
                <p className="reset-text">Insira e confirme sua nova senha abaixo.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group-red">
                        <label htmlFor="password">Nova Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group-red">
                        <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <button type="submit" className="reset-button">Redefinir Senha</button>
                </form>
            </div>
        </div>
    );
}

export default RedefinirSenha;
