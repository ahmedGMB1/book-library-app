import React, { useState } from 'react';

const Edit = ({ author, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        first_name: author.firstName,
        last_name: author.lastName,
        email: author.email,
        phone: author.phone,
        bio: author.bio,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...author, ...formData });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">Edit Author</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label>
                        Bio:
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
