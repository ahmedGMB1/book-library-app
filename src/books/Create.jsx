import React, { useState, useEffect } from 'react';
import AuthService from '../AuthService';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';

const Create = ({ onCreate, onClose }) => {
    const { api } = AuthService();
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await api.get('/list/authors');
            setAuthors(response.data.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
            toast.error('Error fetching authors');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, author_id: authorId, isbn, publisher, cover_image: coverImage, year, summary };
        onCreate(newBook);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg max-h-full overflow-y-auto">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New Book</h2>
                    <CustomButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </CustomButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Author</label>
                        <select
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select an author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.firstName} {author.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">ISBN</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter ISBN"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Publisher</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter publisher"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Year</label>
                        <input
                            type="number"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter publication year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Summary</label>
                        <textarea
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Cover Image URL</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter cover image URL"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <CustomButton
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        >
                            Save
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
