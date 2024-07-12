import React, { useEffect, useState } from "react";
import AuthService from "../AuthService";
import { toast } from 'react-toastify';

export default function Dashboard() {
    /* const { http } = AuthService();
    const [userDetail, setUserDetail] = useState(null);
    const [numAuthors, setNumAuthors] = useState(0);
    const [numBooks, setNumBooks] = useState(0);

    useEffect(() => {
        fetchUserDetail();
        fetchNumberOfAuthors();
        fetchNumberOfBooks();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((response) => {
            console.log(response.data);
            setUserDetail(response.data);
        });
    };

    const fetchNumberOfAuthors = () => {
        // Replace with your API call to fetch number of authors
        // Example: http.get('/authors/count')
        const numAuthors = 10; // Replace with actual fetched data
        setNumAuthors(numAuthors);
    };

    const fetchNumberOfBooks = () => {
        // Replace with your API call to fetch number of books
        // Example: http.get('/books/count')
        const numBooks = 20; // Replace with actual fetched data
        setNumBooks(numBooks);
    }; */

    const { http } = AuthService();
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
            const response = await http.post('/me');
            console.log(response.data);
            setUserDetail(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error("Error fetching user details:", error);
        }
    };

    const fetchNumberOfAuthors = async () => {
        try {
            const response = await http.get('/authors'); // Adjust endpoint if necessary
            const authors = response.data.meta.total; // Assuming response.data is the array of authors
            setNumAuthors(authors);
            alert(authors);
        } catch (error) {
            console.error('Error fetching number of authors:', error);
            toast.error('Error fetching number of authors:', error);
        }
    };

    const fetchNumberOfBooks = async () => {
        try {
            const response = await http.get('/books'); // Adjust endpoint if necessary
            const books = response.data.meta.total; // Assuming response.data is the array of books
            setNumBooks(books);
        } catch (error) {
            console.error('Error fetching number of books:', error);
            toast.error('Error fetching number of books:', error);
        }
    };

    /* const fetchNumberOfAuthors = async () => {
        try {
            const response = await http.get('/authors');
            console.log('Authors Response:', response.data); // Debugging log
            const authors = response.data; // Assuming response.data is the array of authors
            if (Array.isArray(authors)) {
                setNumAuthors(authors.length);
            } else {
                console.error('Authors data is not an array:', authors);
            }
        } catch (error) {
            console.error('Error fetching number of authors:', error);
        }
    };

    const fetchNumberOfBooks = async () => {
        try {
            const response = await http.get('/books');
            console.log('Books Response:', response.data); // Debugging log
            const books = response.data; // Assuming response.data is the array of books
            alert(response.data.meta.total);
            if (Array.isArray(books)) {
                setNumBooks(books.length);
            } else {
                console.error('Books data is not an array:', books);
            }
        } catch (error) {
            console.error('Error fetching number of books:', error);
        }
    }; */

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
