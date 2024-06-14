import { useState } from 'react';


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3500/auth/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        //FIGURE OUT HOW COOKIE IS STORED AND IMPLEMENT IT HERE
        if(response.ok){
            console.log(`user ${username} has been logged in`)
        }

    }
    return { login, isLoading, error}
}

