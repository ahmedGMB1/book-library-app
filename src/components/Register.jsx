import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../AuthService";
import { toast } from 'react-toastify';

export default function Register() {

    const navigate = useNavigate();
    const { http, setToken } = AuthService();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();

    const handleRegister = async () => {
        try {
            const response = await http.post('/auth/register', {
                name,
                email,
                password,
                password_confirmation: cpassword
            });
            console.log(response.data);
            toast.success('Registered successfully. Please log in.');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                toast.error(`Registration failed: ${error.response.data.error || error.response.data.message}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('Registration failed: No response from server.');
            } else {
                console.error('Error message:', error.message);
                toast.error(`Registration failed: ${error.message}`);
            }
        }
    };

    const submitForm = () => {
        console.log(email + ' ' + password);
        //api call
        /* http.post('/auth/register', {name:name, email: email, password:password, password_confirmation:cpassword}).then((response)=>{
            console.log(response.data);
            navigate('/login');
        }) */
        handleRegister();
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
                        Register your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    onChange={e => setName(e.target.value)}
                                    name="name"
                                    type="name"
                                    placeholder="Name"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                        </div>

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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password_confirmation"
                                    onChange={e => setCPassword(e.target.value)}
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
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
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}