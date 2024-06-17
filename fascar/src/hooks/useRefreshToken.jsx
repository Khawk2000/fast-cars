import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();


    const refresh = async () => {
        const response = await fetch('http://localhost:3500/auth/refresh', {
            method: 'GET',
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.accessToken);
            return {...prev, accessToken: response.accessToken }
        })
        return response.accessToken;
    }

    return refresh;
}

export default useRefreshToken;
