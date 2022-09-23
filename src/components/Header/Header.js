import '../Header/Header.css'
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate()
    return(
        <div className="header">
            <h2>CONTROLE DE ENTRADAS/SAIDAS</h2>
            <button onClick={() => { navigate('/') }}>Logout</button>
        </div>
    )
}