import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { FaTimes } from 'react-icons/fa';

const Create = ({ onCreate, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAuthor = { first_name: firstName, last_name: lastName, email, phone, bio };
        onCreate(newAuthor);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg max-h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New Author</h2>
                    <CustomButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </CustomButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Bio</label>
                        <textarea
                            className="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                        ></textarea>
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
