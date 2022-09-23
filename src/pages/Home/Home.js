import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../Home/Home.css'
import Header from '../../components/Header/Header'
import InsertArea from "../../components/InsertArea/InsertArea"
import Axios from "axios"
import lixeira from '../Home/bin.svg'

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [mainUser, setMainUser] = useState([])
    let teste = []




    useEffect(() => {

        if (sessionStorage.getItem('user-logged-id') === 'false') {
            setUser(null)
        } else {
            Axios.post("http://localhost:3001/home", {
                id: sessionStorage.getItem('user-logged-id')
            }).then(res => {
                setUser(res.data)
                setMainUser(res.data)
            })
        }
    }, [])


    const handleClickBin = (e) => {
        console.log(e)

        Axios.post('http://localhost:3001/delete', {
            id: e
        }).then(res => {
            window.location.reload(false);
        })

    }

    const handleFilterClick = () => {
        let select = document.getElementById("select")
        let newUser = mainUser.movements.filter((i) => i.date.substring(5, 7) === select.value)

        if (newUser.length == 0) {
            newUser = null
        }

        setUser({
            name: mainUser.name,
            id: mainUser.id,
            emai: mainUser.email,
            movements: newUser
        })

    }


    if (user) {
        console.log(user.movements)
        return (

            <div className="container-home">
                <Header />
                <h3>Olá, {user.name}!</h3>
                <select id="select">
                    <optgroup label="Escolha um mês">
                        <option value="01">Janeiro</option>
                        <option value="02">Fevereiro</option>
                        <option value="03">Março</option>
                        <option value="04">Abril</option>
                        <option value="05">Maio</option>
                        <option value="06">Junho</option>
                        <option value="07">Julho</option>
                        <option value="08">Agosto</option>
                        <option value="09">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </optgroup>
                </select>
                <button onClick={() => { handleFilterClick() }}>Filtrar</button>
                <div className="main">
                    <div className="container-outs-ins">
                        {user.movements ? user.movements.map(i => {
                            return (
                                <div className="item" key={i.classe}>
                                    <div className="top-card">
                                        <div>{i.classe}</div>
                                        <div className="date-card">{i.date}</div>
                                    </div>
                                    <div className="in">+ {i.entrada}</div><div className="out">- {i.saida}</div>
                                    <div className="remove" onClick={() => handleClickBin(i.id)}><img src={lixeira}></img></div>
                                </div>
                            )
                        }) : <div className="alert"><p>Ainda não existem movimentações registradas nesse mês, adicione-as no campo abaixo ou escolha outro mês.</p></div>}
                    </div>
                </div>
                <div className="total">
                    {user.movements ? user.movements.map(i => { teste.push(i) }) : 'não'}
                    <div className="total-saidas">Total de saidas: <span className="span-saidas">{teste.map(item => parseFloat(item.saida)).reduce((prev, curr) => prev + curr, 0)}</span> </div>
                    <div className="total-entradas">Total de entradas: <span className="span-entradas">{teste.map(item => parseFloat(item.entrada)).reduce((prev, curr) => prev + curr, 0)}</span></div>
                </div>
                <InsertArea />
            </div>
        )
    } else {
        return (
            <div>
                Não existe usuario cadastrado!
                <button onClick={() => { navigate('/') }}>Faça seu login!</button>
            </div>
        )
    }


}