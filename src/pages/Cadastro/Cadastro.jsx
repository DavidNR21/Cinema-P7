import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CinemaContext } from '../../context/CinemaContext';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';


function Cadastro() {


  const { count, incrementCount } = useContext(CinemaContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cidade, setCidade] = useState('');
  const [proprietario, setProprietario] = useState(false);
  const navigation = useNavigate()

  const saveUserData = (u) => {
    localStorage.setItem('userData', JSON.stringify(u));
  };


  const fetchUsuario = async (dados) => {
    if (senha.length < 6) {
      toast.error('A senha deve possuir mais de 6 caracteres');
    } else {
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

        // Resetar os campos do formulário
        setNome('');
        setEmail('');
        setSenha('');
        setCpf('');
        setCelular('');
        setSexo('');
        setNascimento('');
        setCidade('');
        setProprietario(false);

        saveUserData(response.data)

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
        nome,
        email,
        cpf,
        senha,
        celular,
        sexo,
        nascimento,
        cidade,
        proprietario
      };

      console.log(count);
      incrementCount();

      try {
        const response = await fetchUsuario(formData);
        console.log('Usuário cadastrado com sucesso:', response);
        navigation('/')

      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
  };


  return (
    <div className='cad-div'>
      <div className='bt-return' onClick={() => navigation(`/`)}>
        <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
      </div>

      <div className="container-cad">
        <h3 className='title-cad'>Cadastro</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="nome">Nome:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='ex: fulano' required />
            </div>
            <div>
              <label className="label-cad" htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ex: example@gmail.com' required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='ex: 12345678900' required />
            </div>
            <div>
              <label className="label-cad" htmlFor="senha">Senha:</label>
              <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder='ex: 12345678' required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="celular">Celular:</label>
              <input type="text" id="celular" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder='ex: (ddd) 112345678' required />
            </div>
            <div>
              <label className="label-cad" htmlFor="sexo">Sexo:</label>
              <input type="text" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} placeholder='ex: masculino' required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="nascimento">Nascimento:</label>
              <input type="date" id="nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />
            </div>
            <div>
              <label className="label-cad" htmlFor="cidade">Cidade:</label>
              <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder='ex: Patos-PB' required />
            </div>
          </div>

          <div className="checkbox-cad">
            <input type="checkbox" id="proprietario" checked={proprietario} onChange={(e) => setProprietario(e.target.checked)} />
            <label className="label-cad-prop" htmlFor="proprietario">Proprietário de cinema</label>
          </div>

          <div className='but-div'>
            <button type="submit" className="submit-button">Fazer Cadastro</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Cadastro;
