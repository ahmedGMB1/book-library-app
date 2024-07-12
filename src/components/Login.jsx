import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../AuthService";
import { toast } from 'react-toastify';

export default function Login() {

    const { http, setToken } = AuthService();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async () => {
        try {
            const response = await http.post('/auth/login', { email: email, password: password });
            console.log(response.data);
            setToken(response.data.user, response.data.access_token);
            toast.success('Logged in successfully.');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response);
                toast.error(`Login failed: ${error.response.data.error || error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                toast.error('Login failed: No response from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                toast.error(`Login failed: ${error.message}`);
            }
        }
    };

    const submitForm = async () => {
        //console.log(email + ' ' + password);
        //api call
        /* http.post('/auth/login', {email: email, password:password}).then((response)=>{
            console.log(response.data);
            setToken(response.data.user, response.data.access_token);
            toast.success('Logged in successfully.');
        }) */
        handleLogin();
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Image"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    onChange={e => setPassword(e.target.value)}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={submitForm}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}