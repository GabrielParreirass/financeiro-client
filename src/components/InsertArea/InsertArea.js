import { useState } from "react"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../InsertArea/InsertArea.css'


export default function InsertArea() {

    const [itemClass, setItemClass] = useState("")
    const [entrada, setEntrada] = useState("")
    const [saida, setSaida] = useState("")
    const [date, setDate] = useState("")
    const navigate = useNavigate()




    const handleSubmit = (event) => {
        event.preventDefault();
        if(itemClass === ""){
            console.log('erro no tipo')
        }
        else if(date === ""){
            console.log("erro na data")
        }
        else if (entrada === "") {
            console.log('erro entrada')
        }
        else if (saida === "") {
            console.log('erro saida')
        }else{

            Axios.post('http://localhost:3001/add', {
                classe: itemClass,
                date: date,
                entrada: entrada,
                saida: saida,
                currId: sessionStorage.getItem('user-logged-id')
            }).then(res=>{
                console.log(res.data)
            })

        }

        

        setEntrada("")
        setSaida("")
        setItemClass("")
        setDate("")

        window.location.reload(false);
    }




    return (
        <div className="container-insert">
            <h3>Adicionar itens</h3>
            <form className="form-home" onSubmit={handleSubmit}>
                <label>Tipo:</label>
                <input
                    placeholder="Descrição"
                    type="text"
                    value={itemClass}
                    onChange={(e) => setItemClass(e.target.value)}
                />
                <label>Data:</label>
                <p id="aviso-calendario">(clicar no icone de calendario)</p>
                <input
                    id="date" 
                    placeholder="Data"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label>Entrada:</label>
                <input
                    type="number"
                    placeholder="Entrada"
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)
                    }
                />
                <label>Saida:</label>
                <input
                    type="number"
                    placeholder="Saida"
                    value={saida}
                    onChange={(e) => setSaida(e.target.value)
                    }
                />

                <button type="submit">Inserir dados</button>
            </form>
        </div>
    )
}