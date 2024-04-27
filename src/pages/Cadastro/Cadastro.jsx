import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { CinemaContext } from '../../context/CinemaContext';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';


function Cadastro() {
  
  const { count, incrementCount } = useContext(CinemaContext)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [nascimento, setNascimento] = useState('');


  const fetchUsuario = async (dados) => {

    if (senha.length < 6){
      toast.error('senha deve possuir mais de 6 caracteres');
    }
    else{
      try {
        const response = await fetch('http://127.0.0.1:5000/user/add', {
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

        toast.success('Usuário cadastrado com sucesso!');

        setNome('')
        setEmail('')
        setSenha('')
        setCpf('')
        setCelular('')
        setSexo('')
        setNascimento('')

        return data;

    } catch (error) {
        console.error('Erro ao enviar requisição:', error);

        toast.error('Erro ao cadastrar usuário');

        throw error;
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        nome: nome,
        email: email,
        cpf: cpf,
        senha: senha,
        celular: celular,
        sexo: sexo,
        nascimento: nascimento
    };

    console.log(count)
    incrementCount()

    try {
        const response = await fetchUsuario(formData);
        console.log('Usuário cadastrado com sucesso:', response);
        
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }

  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          <input type="text" id="celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="sexo">Sexo:</label>
          <input type="text" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="nascimento">Nascimento:</label>
          <input type="date" id="nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
        </div>
        <button type="submit">Fazer Cadastro</button>
      </form>
    </div>
  );
}

export default Cadastro;
