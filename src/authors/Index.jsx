import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import View from './View';
import Edit from './Edit';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';

const Index = () => {
    const { http } = AuthService();
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [authorDetails, setAuthorDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: ''
    });

    useEffect(() => {
        fetchAuthors();
    }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

    const hasNoNumeric = (str) => {
        return !/\d/.test(str);
    };

    const fetchAuthors = async () => {
        console.log(searchTerm);
        try {
            if (searchTerm !== '') { // Check if searchTerm is not empty
                console.log('searching...');
                let params = {
                    page: currentPage,
                };

                if (searchTerm.includes('@')) {
                    params.email = searchTerm;
                } else if (hasNoNumeric(searchTerm)) {
                    const nameParts = searchTerm.split(' ');
                    if (nameParts.length > 1) {
                        params.first_name = nameParts[0];
                        params.last_name = nameParts[1];
                    } else {
                        params.first_name = searchTerm;
                    }
                } else if (!isNaN(searchTerm)) {
                    params.phone = searchTerm;
                } else {
                    params.last_name = searchTerm;
                }

                console.log(params);
                const response = await http.get('/author/search', { params });
                setAuthors(response.data.data);
                setTotalPages(response.data.meta.last_page);
            } else {
                console.log('fetching...');
                const response = await http.get('/authors', {
                    params: {
                        page: currentPage,
                    }
                });
                setAuthors(response.data.data);
                setTotalPages(response.data.meta.last_page);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching author.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleDelete = async (authorId) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            try {
                await http.delete(`/authors/${authorId}`);
                toast.success('Author deleted successfully');
                fetchAuthors();
            } catch (error) {
                console.error('Error deleting author:', error);
                toast.error('Error updating author.');
            }
        }
    };

    const handleView = (author) => {
        setSelectedAuthor(author);
        setIsViewing(true);
    };

    const handleEdit = (author) => {
        setSelectedAuthor(author);
        setIsEditing(true);
    };

    const handleSave = async (updatedAuthor) => {
        try {
            await http.put(`/authors/${updatedAuthor.id}`, updatedAuthor);
            setIsEditing(false);
            setSelectedAuthor(null);
            fetchAuthors();
            toast.success('Author updated successfully');
        } catch (error) {
            console.error('Error updating author:', error);
            toast.error('Error updating author.');
        }
    };

    const truncateBio = (bio) => {
        const words = bio.split(' ');
        const maxLength = 8; // Maximum words for truncated bio
        if (words.length > maxLength) {
            return `${words.slice(0, maxLength).join(' ')} ... `;
        }
        return bio;
    };

    const renderBioWithReadMore = (bio) => {
        const maxLength = 8; // Maximum words for truncated bio
        const words = bio.split(' ');
        if (words.length <= maxLength) {
            return bio;
        } else {
            const truncatedBio = words.slice(0, maxLength).join(' ');
            return (
                <>
                    {truncatedBio}{' '}
                    <a href="#" onClick={() => handleEdit(author)} className="text-blue-500 hover:underline">
                        Read more
                    </a>
                </>
            );
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function renderElement() {
        if (authors.length > 0) {
            return (
                <div className="container mx-auto px-4 py-1">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Author List</h1>

                        <div className="relative text-gray-600">
                            <input
                                type="text"
                                placeholder="Search by name, email or phone"
                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-center">S.No.</th>
                                <th className="py-2 px-4 border-b text-center">First Name</th>
                                <th className="py-2 px-4 border-b text-center">Last Name</th>
                                <th className="py-2 px-4 border-b text-center">Email</th>
                                <th className="py-2 px-4 border-b text-center">Phone</th>
                                <th className="py-2 px-4 border-b text-center">Bio</th>
                                <th className="py-2 px-4 border-b text-center">Books Authored</th>
                                <th className="py-2 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author, index) => (
                                <tr key={author.id}>
                                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{author.firstName}</td>
                                    <td className="py-2 px-4 border-b">{author.lastName}</td>
                                    <td className="py-2 px-4 border-b">{author.email}</td>
                                    <td className="py-2 px-4 border-b">{author.phone}</td>
                                    <td className="py-2 px-4 border-b">
                                        {renderBioWithReadMore(author.bio)}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{author.books.length}</td>
                                    <td className="py-2 px-4 border-b flex space-x-2">
                                        <CustomButton
                                            className="text-green-500 hover:text-green-700"
                                            onClick={() => handleView(author)}
                                        >
                                            <FaEye />
                                        </CustomButton>
                                        <CustomButton
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEdit(author)}
                                        >
                                            <FaEdit />
                                        </CustomButton>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDelete(author.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                            author={selectedAuthor}
                            onClose={() => setIsViewing(false)}
                        />
                    )}
                    {isEditing && (
                        <Edit
                            author={selectedAuthor}
                            onSave={handleSave}
                            onClose={() => setIsEditing(false)}
                        />
                    )}
                </div>
            );
        } else {
            return <p className="text-center mt-8">Loading... Please wait...</p>;
        }
    }

    return renderElement();
};

export default Index;
