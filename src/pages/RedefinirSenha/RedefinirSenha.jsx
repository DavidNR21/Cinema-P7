/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './styles.css';
import { atualizar_usuario } from '../../data/apis';
import { useParams } from 'react-router-dom';


function RedefinirSenha() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [userId, setUserId] = useState('')
    const [DATA, setDATA] = useState({})
    const parametros = useParams()


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem!')
            return
        }
        // Adicione a lógica para redefinir a senha aqui (API call etc.)

        const updateData = {
            metodo: 'senha',
            senha: password,
            state : parametros.state,
            email : email
        };

        const userIdToUpdate = DATA.length === 0 ? userId : DATA['id'];

        atualizar_usuario(userIdToUpdate, updateData).then(response => {
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

        if (userData != null){
            setDATA(userData)
            setUserId(userData['id'])
        }
        else{
            setUserId('-x-')
        }
        console.log(parametros.state)

    },[])

    return (
        <div className="reset-container">
            <div className="reset-box">
                <h2>Redefinir Senha</h2>
                <p className="reset-text">Insira e confirme sua nova senha abaixo.</p>
                <form onSubmit={handleSubmit}>
                    {parametros.state == 'login' ? (
                        <>
                            <div className="input-group-red">
                                <label htmlFor="password">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
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
