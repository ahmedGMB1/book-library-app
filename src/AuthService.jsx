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
        navigate('/');
    }

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const api = axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        api,
        logout
    }
}