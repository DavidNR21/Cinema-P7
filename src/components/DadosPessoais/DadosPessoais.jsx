import { useNavigate } from 'react-router-dom'
import './styles.css'


function DadosPessoais ({ dados }){

    const navigation = useNavigate()

    return(
        <section id="dados-pessoais">
            <h2>Dados Pessoais</h2>
            <div className="dados-pessoais-section">
                <div className="dados-item">
                    <label>Nome:</label>
                    <p>{dados.nome}</p>
                </div>
                <div className="dados-item">
                    <label>Email:</label>
                    <p>{dados.email}</p>
                </div>
                <div className="dados-item">
                    <label>CPF:</label>
                    <p>{dados.cpf}</p>
                </div>
            </div>
            <div className="dados-pessoais-section">
                <div className="dados-item">
                    <label>Data de Nascimento:</label>
                    <p>{dados.nascimento}</p>
                </div>
                <div className="dados-item">
                    <label>Sexo:</label>
                    <p>{dados.sexo}</p>
                </div>
                <div className="dados-item">
                    <label>Celular:</label>
                    <p>{dados.celular}</p>
                </div>
                <button type="submit" className="res-button" onClick={() => navigation('/Redefinir/linkado')} >
                    Redefinir Senha
                </button>
            </div>
        </section>
    )
}


export default DadosPessoais


