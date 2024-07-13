import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaEye, FaSearch, FaPlus } from 'react-icons/fa';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';
import View from './View';
import Edit from './Edit';
import Create from './Create';

const Index = () => {
  const { api } = AuthService();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12); // 4 books per row, 3 rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchTerm]);

  const fetchBooks = async () => {
    try {
      let params = { page: currentPage };

      if (searchTerm !== '') {
        if (!isNaN(searchTerm) && searchTerm.length > 4) {
          params.isbn = searchTerm;
        } else if (searchTerm.length === 4 && !isNaN(searchTerm)) {
          params.year = searchTerm;
        } else if (searchTerm.toLowerCase().includes('publisher')) {
          params.publisher = searchTerm.replace(/publisher\s?:?\s?/i, '');
        } else {
          params.title = searchTerm;
        }
        const response = await api.get('/book/search', { params });
        setBooks(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } else {
        const response = await api.get('/books', { params });
        setBooks(response.data.data);
        setTotalPages(response.data.meta.last_page);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching books.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${bookId}`);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Error deleting book.');
      }
    }
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setIsViewing(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleSave = async (updatedBook) => {
    try {
      await api.put(`/books/${updatedBook.id}`, updatedBook);
      setIsEditing(false);
      setSelectedBook(null);
      fetchBooks();
      toast.success('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Error updating book.');
    }
  };

  const handleCreateSave = async (newBook) => {
    try {
      await api.post('/books', newBook);
      setIsCreating(false);
      fetchBooks();
      toast.success('Book added successfully');
    } catch (error) {
      console.error('Error creating book:', error);
      toast.error('Error creating book.');
    }
  };

  const truncateSummary = (summary) => {
    const words = summary.split(' ');
    const maxLength = 8;
    if (words.length > maxLength) {
      return `${words.slice(0, maxLength).join(' ')} ... `;
    }
    return summary;
  };

  const renderDescriptionWithReadMore = (summary) => {
    const maxLength = 8;
    const words = summary.split(' ');
    if (words.length <= maxLength) {
      return summary;
    } else {
      const truncatedDescription = words.slice(0, maxLength).join(' ');
      return (
        <>
          {truncatedDescription}{' '}
          <span className="text-gray-500 hover:underline">... Read more</span>
        </>
      );
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderElement = () => {
    if (books.length >= 0) {
      return (
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Book List</h1>
            <div className="flex space-x-2">
              <CustomButton
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center space-x-2 hover:bg-green-700"
              >
                <FaPlus />
                <span>Add Book</span>
              </CustomButton>
              <div className="relative text-gray-600">
                <input
                  type="text"
                  placeholder="Search by Title, ISBN, Year or Publisher"
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4">
                <img src={book.coverImage} alt="Cover Image" className="w-full h-48 object-cover mb-2 rounded" />
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-sm text-gray-700"><strong>Author:</strong> {book.author.firstName} {book.author.lastName}</p>
                <p className="text-sm text-gray-700"><strong>Publisher:</strong> {book.publisher}</p>
                <p className="text-sm text-gray-700"><strong>ISBN:</strong> {book.isbn}</p>
                <p className="text-sm text-gray-700"><strong>Year:</strong> {book.year}</p>
                <p className="text-sm text-gray-700">
                  {renderDescriptionWithReadMore(book.summary)}
                </p>
                <div className="flex space-x-2 mt-2">
                  <CustomButton
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleView(book)}
                  >
                    <FaEye />
                  </CustomButton>
                  <CustomButton
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(book)}
                  >
                    <FaEdit />
                  </CustomButton>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(book.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex list-none">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className="mx-1">
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {isViewing && (
            <View
              book={selectedBook}
              onClose={() => setIsViewing(false)}
            />
          )}
          {isEditing && (
            <Edit
              book={selectedBook}
              onSave={handleSave}
              onClose={() => setIsEditing(false)}
            />
          )}
          {isCreating && (
            <Create
              onCreate={handleCreateSave}
              onClose={() => setIsCreating(false)}
            />
          )}
        </div>
      );
    } else {
      return <p className="text-center mt-8">Loading... Please wait...</p>;
    }
  };

  return <div>{renderElement()}</div>;
};

export default Index;
