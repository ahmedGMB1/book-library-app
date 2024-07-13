import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';

const View = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-3/4 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <CustomButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </CustomButton>
        </div>
        <div className="flex flex-col space-y-2">
          <img src={book.coverImage} alt="Cover" className="w-full h-48 object-cover rounded mb-2" />
          <p><strong>Author:</strong> {book.author.firstName} {book.author.lastName}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Cover Image URL:</strong> {book.coverImage}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Summary:</strong> {book.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
