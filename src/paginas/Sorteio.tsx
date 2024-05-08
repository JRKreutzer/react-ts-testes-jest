import { useState } from "react"
import { useListaParticipantes } from "../state/hooks/useListaParticipantes"
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio"
import './Sorteio.css'
import Card from "../componentes/Card"

const Sorteio = () => {

    const participantes = useListaParticipantes()

    const [participanteDaVez, setParticipanteDaVez]= useState('')
    const [amigoSecreto, setAmigoSecreto]= useState('')

    const resultado = useResultadoSorteio()

    const sortear = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (resultado.has(participanteDaVez)){
            setAmigoSecreto(resultado.get(participanteDaVez)!)
            setTimeout(() => {
                setAmigoSecreto('')
            }, 5000)
        }
    }

    return (
        <Card>
            <section className="sorteio">
                <h2>Quem vai tirar o papelzinho?</h2>
                <form onSubmit={sortear}>
                    <select 
                        required 
                        name="participanteDaVez" 
                        id="participanteDaVez" 
                        placeholder="Selecione o seu nome"
                        value={participanteDaVez}
                        onChange={e => setParticipanteDaVez(e.target.value)}
                    >
                        <option>Selecione seu nome</option>
                        {participantes.map(participante => <option key={participante}>{participante}</option>)}
                    </select>
                    <button className="botao-sortear">Sortear</button>
                </form>
                {amigoSecreto && <p role="alert" className="resultado">{amigoSecreto}</p>}
                <footer className="sorteio">
                    <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de avião de papel" />
                </footer>
            </section>
        </Card>
    )
}

export default Sorteio