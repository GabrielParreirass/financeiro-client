import { useState, useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../Login/Login.css'


function Home() {

    const navigate = useNavigate()

    const [psswd, setPsswd] = useState("")
    const [email, setEmail] = useState("")


    useEffect(() => {
        sessionStorage.clear()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        await Axios.post('http://localhost:3001/', {
            email: email,
            psswd: psswd
        }).then((res) => {

            if (res.data.id === undefined) {
                sessionStorage.setItem('user-logged-id', 'false')

                navigate('/home')
            } else {
                sessionStorage.setItem('user-logged-id', res.data.id)

                navigate('/home')
            }


        })

        setEmail("")
        setPsswd("")
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={psswd}
                onChange={(e) => setPsswd(e.target.value.toString())
                }
            />

            <button type="submit">Login</button>
        </form>
    )
}

export default Home