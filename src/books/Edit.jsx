import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';

const Edit = ({ book, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...book });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-3/4 max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Book</h2>
                    <CustomButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </CustomButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </label>
                        <label>
                            Author:
                            <input
                                type="text"
                                name="author"
                                value={`${formData.author.firstName} ${formData.author.lastName}`}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-full"
                                readOnly
                            />
                        </label>

                        <label>
                            Cover Image URL:
                            <input
                                type="text"
                                name="cover_image"
                                value={`${formData.coverImage}`}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-full"
                                readOnly
                            />
                        </label>
                        <div className="flex space-x-2">
                            <label className="w-1/3">
                                Publisher:
                                <input
                                    type="text"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            </label>
                            <label className="w-1/3">
                                ISBN:
                                <input
                                    type="text"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            </label>
                            <label className="w-1/3">
                                Year:
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            </label>
                        </div>
                        <label>
                            Summary:
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className="border rounded px-2 py-1 w-full"
                            />
                        </label>
                        <div className="flex justify-end space-x-2">
                            <CustomButton
                                type="button"
                                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                onClick={onClose}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save
                            </CustomButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
