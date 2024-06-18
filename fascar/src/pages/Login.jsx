import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate, useLocation } from 'react-router-dom'

//Login page

//Need to figure out how cookie can be stored and accessed to get to other pages other than login
const Login = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3500/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (!response.ok) {
            console.log('No work')
        }
        //FIGURE OUT HOW COOKIE IS STORED AND IMPLEMENT IT HERE
        if (response.ok) {
            console.log(`user ${username} has been logged in`)
            const accessToken = json.accessToken
            setAuth({ username, password, accessToken })
            navigate(from, {replace: true})
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Username:</label>
            <input
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="login-button">Login</button>
        </form>
    )
}

export default Login
