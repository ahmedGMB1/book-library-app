import React, { useEffect, useState } from "react";
import AuthService from "../AuthService";
import { toast } from 'react-toastify';

export default function Dashboard() {
    
    const { api } = AuthService();
    const [userDetail, setUserDetail] = useState(null);
    const [numAuthors, setNumAuthors] = useState(0);
    const [numBooks, setNumBooks] = useState(0);

    useEffect(() => {
        fetchUserDetail();
        fetchNumberOfAuthors();
        fetchNumberOfBooks();
    }, []);

    const fetchUserDetail = async () => {
        try {
            const response = await api.post('/me');
            console.log(response.data);
            setUserDetail(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error("Error fetching user details:", error);
        }
    };

    const fetchNumberOfAuthors = async () => {
        try {
            const response = await api.get('/authors'); 
            const authors = response.data.meta.total; 
            setNumAuthors(authors);
        } catch (error) {
            console.error('Error fetching number of authors:', error);
            toast.error('Error fetching number of authors:', error);
        }
    };

    const fetchNumberOfBooks = async () => {
        try {
            const response = await api.get('/books'); 
            const books = response.data.meta.total; 
            setNumBooks(books);
        } catch (error) {
            console.error('Error fetching number of books:', error);
            toast.error('Error fetching number of books:', error);
        }
    };

    function renderElement() {
        if (userDetail) {
            return (
                <div className="bg-gray-100 min-h-screen">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white shadow-md rounded-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-300 rounded-md p-4">
                                    <h3 className="text-lg font-semibold mb-2">User Information</h3>
                                    <p><strong>Name:</strong> {userDetail.name}</p>
                                    <p><strong>Email:</strong> {userDetail.email}</p>
                                </div>
                                <div className="bg-gray-300 rounded-md p-4">
                                    <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white shadow-md rounded-md p-4">
                                            <h5 className="text-lg font-semibold">Number of Authors</h5>
                                            <p className="text-gray-600">{numAuthors}</p>
                                        </div>
                                        <div className="bg-white shadow-md rounded-md p-4">
                                            <h5 className="text-lg font-semibold">Number of Books</h5>
                                            <p className="text-gray-600">{numBooks}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <p className="text-center mt-8">Loading... Please wait...</p>;
        }
    }

    return renderElement();
}
