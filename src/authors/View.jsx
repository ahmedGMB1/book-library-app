import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';

const View = ({ author, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">View Author</h2>
                    <CustomButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </CustomButton>
                </div>
                <p><strong>First Name:</strong> {author.firstName}</p>
                <p><strong>Last Name:</strong> {author.lastName}</p>
                <p><strong>Email:</strong> {author.email}</p>
                <p><strong>Phone:</strong> {author.phone}</p>
                <p><strong>Bio:</strong> {author.bio}</p>
                <p><strong>Books Authored:</strong> {author.books.length}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default View;
