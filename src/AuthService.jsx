import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthService() {

    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    
    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const userDetail = JSON.parse(userString);
        return userDetail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const API_URL = "http://127.0.0.1:8000/api/";
    //const API_URL = "https://book-author-api.softneedstack.online/api";

    const http = axios.create({
        baseURL:API_URL,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}