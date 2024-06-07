import { toast } from 'react-toastify';
import './styles.css'


function MeusIngressos ({ dados }){

    const handleDownload = async (reservaId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/reservas/v2/gerar/${reservaId}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/pdf',
                },
            });
      
            if (!response.ok) {
                throw new Error('Erro ao baixar o PDF');
            }
      
            const url = response.url; // URL direta da resposta

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ingresso.pdf'); // Nome do arquivo
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('PDF baixado com sucesso!');
        } catch (error) {
          console.error('Erro ao baixar o PDF:', error);
          toast.error('Erro ao baixar o PDF');
        }
    };


    return(
        <section id="meus-ingressos">
            {
                dados.length === 0 ? (
                    <>
                        <p className="no-ingressos-message">Você não possui ingressos.</p>
                    </>
                ) : (
                    <>
                    <h2>Meus Ingressos</h2>
                    <div className="ingressos-container">
                        {dados.map((ingresso, index) => (
                            <div key={index} className="ingresso-card">
                                <div className="ingresso-card-details">
                                    <h3>{ingresso.filme.nome_filme}</h3>
                                    <p>Hora: {ingresso.horario}</p>
                                    <p>Cinema: {ingresso.cidade.cinema_nome}</p>
                                    <p>Sala: {ingresso.sala.nome_sala}</p>
                                    <p>Data: {ingresso.dia}</p>
                                </div>
                            <div className="ingresso-actions">
                                <button className="action-button" onClick={() => handleDownload(ingresso.id)}>
                                    <i className="bx bx-download" id='ingresso-icon'></i>
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </>
                )
            }
        </section>
    )
}


export default MeusIngressos

