import { useState } from 'react';
import './styles.css'


const ModalEdicao = ({ type, isOpen, onClose }) => {

    const [nomeFilme, setNomeFilme] = useState('');
    const [imagem, setImagem] = useState('');
    const [precoIngresso, setPrecoIngresso] = useState('');
    const [horarios, setHorarios] = useState('');
    const [dubLeg, setDubLeg] = useState('');
    const [duracao, setDuracao] = useState('');
    const [cinema, setCinema] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoFilme = {
            nome_filme: nomeFilme,
            imagem: imagem,
            preco_ingresso: parseFloat(precoIngresso),
            horarios: horarios,
            dub_leg: dubLeg,
            duracao: duracao,
            cinema: cinema
        };
        console.log('Novo Filme:', novoFilme);
        // Aqui você pode fazer uma requisição para enviar o novo filme ao servidor
        onClose(); // Fecha o modal após o envio do formulário
    };

    if (!isOpen) return null;



    const renderContent = () => {

        switch (type) {
            case 'Adicionar Cinema':
                return (
                    <div>
                        <h3>Adicionar Cinema</h3>
                        {/* Formulário para adicionar cinema */}
                    </div>
                );
            case 'Adicionar Filme':
                return (
                    <div>
                        <h3>Adicionar Filme</h3>
                        <form onSubmit={handleSubmit} className="form-adicionar-filme">
                            <div className="form-group-adm">
                                <label htmlFor="nomeFilme">Nome do Filme:</label>
                                <input
                                    type="text"
                                    id="nomeFilme"
                                    value={nomeFilme}
                                    onChange={(e) => setNomeFilme(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="imagem">URL da Imagem:</label>
                                <input
                                    type="text"
                                    id="imagem"
                                    value={imagem}
                                    onChange={(e) => setImagem(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="precoIngresso">Preço do Ingresso:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="precoIngresso"
                                    value={precoIngresso}
                                    onChange={(e) => setPrecoIngresso(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="horarios">Horários:</label>
                                <input
                                    type="text"
                                    id="horarios"
                                    value={horarios}
                                    onChange={(e) => setHorarios(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="dubLeg">Dublado ou Legendado:</label>
                                <input
                                    type="text"
                                    id="dubLeg"
                                    value={dubLeg}
                                    onChange={(e) => setDubLeg(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="duracao">Duração:</label>
                                <input
                                    type="text"
                                    id="duracao"
                                    value={duracao}
                                    onChange={(e) => setDuracao(e.target.value)}
                                />
                            </div>
                            <div className="form-group-adm">
                                <label htmlFor="cinema">Cinema:</label>
                                <input
                                    type="text"
                                    id="cinema"
                                    value={cinema}
                                    onChange={(e) => setCinema(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-button-adm">Adicionar Filme</button>
                        </form>
                    </div>
                );
            case 'Editar Filme':
                return (
                    <div>
                        <h3>Editar Filme</h3>
                        {/* Formulário para editar filme */}
                    </div>
                );
            case 'Editar Cinema':
                return (
                    <div>
                        <h3>Editar Cinema</h3>
                        {/* Formulário para editar cinema */}
                    </div>
                );
            default:
                return null;
        }
    };


    return(
        <div className="modal-overlay-details" onClick={onClose}>
            <div className="modal-content-edit" onClick={(e) => e.stopPropagation()}>
                <div className='modal-content-form'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}


export default ModalEdicao

