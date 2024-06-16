import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';


function Manager() {

    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [preco, setPreco] = useState(10.20);
    const [horario, setHorario] = useState('');
    const [duracao, setDuracao] = useState('');
    const [dublagem, setDublagem] = useState('');
    const [cinema_nome, setCinema] = useState('');

    const navigation = useNavigate()


    const fetchUsuario = async (dados) => {
        if (nome.length < 6) {
            toast.error('Nao pode ser vazio');
        } else {
            try {
                const response = await fetch('http://127.0.0.1:5000/filme/criar', {
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

                toast.success('Filme cadastrado com sucesso!');

                return data;

            } catch (error) {
                console.error('Erro ao enviar requisição:', error);
                toast.error('Erro ao cadastrar Filme');
                throw error;
            }
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = {
        nome,
        imagem,
        preco,
        dublagem,
        cinema_nome,
        horario,
        duracao
      };


      try {
        const response = await fetchUsuario(formData);
        console.log('Usuário cadastrado com sucesso:', response);
        navigation(`/Perfil`)

      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
  };


  return (
    <div className='cad-div'>
      <div className='bt-return' onClick={() => navigation(`/Perfil`)}>
        <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
      </div>

      <div className="container-cad">
        <h3 className='title-cad'>Criar Filme</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="nome">Nome do filme:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}  required />
            </div>
            <div>
              <label className="label-cad" htmlFor="email">Nome do cinema:</label>
              <input type="text" id="email" value={cinema_nome} onChange={(e) => setCinema(e.target.value)}  required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="cpf">Preço:</label>
              <input type="text" id="cpf" value={preco} onChange={(e) => setPreco(e.target.value)}  required />
            </div>
            <div>
              <label className="label-cad" htmlFor="senha">Dublagem:</label>
              <input type="text" id="senha" value={dublagem} onChange={(e) => setDublagem(e.target.value)} required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="celular">Horario:</label>
              <input type="text" id="celular" value={horario} onChange={(e) => setHorario(e.target.value)} required />
            </div>
            <div>
              <label className="label-cad" htmlFor="sexo">Duração:</label>
              <input type="text" id="sexo" value={duracao} onChange={(e) => setDuracao(e.target.value)} required />
            </div>
          </div>

          <div className="form-group-cad">
            <div>
              <label className="label-cad" htmlFor="nascimento">Imagem:</label>
              <input type="text" id="nascimento" value={imagem} onChange={(e) => setImagem(e.target.value)} required />
            </div>
          </div>

          <div className='but-div-cine'>
            <button type="submit" className="submit-button-cine">Criar Filme</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Manager;
