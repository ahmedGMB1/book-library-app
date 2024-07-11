/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';

const Index = () => {
    const { http } = AuthService();
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(5); // You can change the number of authors per page

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await http.get('/authors');
                const data = response.data.data;  // Access the array of authors
                if (Array.isArray(data)) {
                    setAuthors(data);
                } else {
                    console.error('Expected array but got', data);
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, [http]);

    // Get current authors
    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors
        .filter(author =>
            author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstAuthor, indexOfLastAuthor);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">Authors</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-md px-2 py-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Bio
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAuthors.map((author) => (
                                    <tr key={author.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{author.firstName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{author.lastName}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{author.bio}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{author.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{author.phone}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                            <button className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing {indexOfFirstAuthor + 1} to {indexOfLastAuthor} of {authors.length} Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                {[...Array(Math.ceil(authors.length / authorsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`text-sm px-4 py-2 border ${number + 1 === currentPage ? 'bg-gray-300' : 'bg-white'} text-gray-700 hover:bg-gray-200`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
 */

/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Routes, Route, Link } from 'react-router-dom';

const Index = () => {
  const { http } = AuthService();
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);

  useEffect(() => {
    const fetchAuthors = () => {
      http.get('/authors').then((response) => {
        setAuthors(response.data.data);
        console.log(response.data.data);
      });
    };

    fetchAuthors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAuthors = authors.filter((author) =>
    `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search"
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
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAuthors.map((author) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
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
            {Array.from({ length: Math.ceil(filteredAuthors.length / authorsPerPage) }, (_, index) => (
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
    </div>
  );
};

export default Index; */


/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const Index = () => {
  const { http } = AuthService(); // Assuming AuthService handles HTTP requests
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

  const fetchAuthors = async () => {
    try {
      const response = await http.get('/authors', {
        params: {
          page: currentPage,
          search: searchTerm // Pass searchTerm to API for filtering
        }
      });
      setAuthors(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleDelete = async (authorId) => {
    try {
      await http.delete(`/authors/${authorId}`);
      // Optionally, update state or refetch authors after deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search"
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
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
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
    </div>
  );
};

export default Index; */

/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const Index = () => {
  const { http } = AuthService(); // Assuming AuthService handles HTTP requests
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

  const fetchAuthors = async () => {
    try {
      const response = await http.get('/authors', {
        params: {
          page: currentPage,
          search: searchTerm // Pass searchTerm to API for filtering
        }
      });
      setAuthors(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleDelete = async (authorId) => {
    try {
      await http.delete(`/authors/${authorId}`);
      // Optionally, update state or refetch authors after deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search"
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
            <th className="py-2 px-4 border-b">S.No.</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Bio</th>
            <th className="py-2 px-4 border-b">Books Authored</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b">{author.bio}</td>
              <td className="py-2 px-4 border-b">{author.books.length}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
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
    </div>
  );
};

export default Index; */

/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const Index = () => {
  const { http } = AuthService(); // Assuming AuthService handles HTTP requests
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

  const fetchAuthors = async () => {
    try {
      const response = await http.get('/authors', {
        params: {
          page: currentPage,
          search: searchTerm // Pass searchTerm to API for filtering
        }
      });
      setAuthors(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleDelete = async (authorId) => {
    try {
      await http.delete(`/authors/${authorId}`);
      // Optionally, update state or refetch authors after deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateBio = (bio) => {
    const words = bio.split(' ');
    if (words.length > 10) {
      return `${words.slice(0, 10).join(' ')} ... `;
    }
    return bio;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search"
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
            <th className="py-2 px-4 border-b">S.No.</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Bio</th>
            <th className="py-2 px-4 border-b">Books Authored</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b">
                {truncateBio(author.bio)}
                {author.bio.split(' ').length > 10 && (
                  <a href="#" className="text-blue-500 hover:underline">
                    Read more
                  </a>
                )}
              </td>
              <td className="py-2 px-4 border-b">{author.books.length}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
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
    </div>
  );
};

export default Index; */

/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const Index = () => {
  const { http } = AuthService(); // Assuming AuthService handles HTTP requests
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

  const fetchAuthors = async () => {
    try {
      const response = await http.get('/authors', {
        params: {
          page: currentPage,
          search: searchTerm // Pass searchTerm to API for filtering
        }
      });
      setAuthors(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleDelete = async (authorId) => {
    try {
      await http.delete(`/authors/${authorId}`);
      // Optionally, update state or refetch authors after deletion
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateBio = (bio) => {
    const words = bio.split(' ');
    if (words.length > 5) {
      return `${words.slice(0, 5).join(' ')} ... `;
    }
    return bio;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search"
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
            <th className="py-2 px-4 border-b">S.No.</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Bio</th>
            <th className="py-2 px-4 border-b">Books Authored</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b">
                {truncateBio(author.bio)}
                {author.bio.split(' ').length > 5 && (
                  <a href="#" className="text-blue-500 hover:underline">
                    Read more <FaEye className="inline-block ml-1" />
                  </a>
                )}
              </td>
              <td className="py-2 px-4 border-b">{author.books.length}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
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
    </div>
  );
};

export default Index; */

import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const Index = () => {
    const { http } = AuthService();
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchAuthors();
    }, [currentPage, searchTerm]); // Fetch authors when currentPage or searchTerm changes

    const fetchAuthors = async () => {
        try {
            const response = await http.get('/authors', {
                params: {
                    page: currentPage,
                    search: searchTerm // Pass searchTerm to API for filtering
                }
            });
            setAuthors(response.data.data);
            setTotalPages(response.data.meta.last_page);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const searchAuthors = async () => {
        try {
            const response = await http.get('/authors/search', {
                params: {
                    email: searchTerm,
                    first_name: searchTerm,
                    phone: searchTerm,
                    last_name: searchTerm,
                    page: currentPage,
                }
            });
            setAuthors(response.data.data);
            setTotalPages(response.data.meta.last_page);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleDelete = async (authorId) => {
        try {
            await http.delete(`/authors/${authorId}`);
            // Optionally, update state or refetch authors after deletion
            fetchAuthors();
        } catch (error) {
            console.error('Error deleting author:', error);
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
                    <a href="#" className="text-blue-500 hover:underline">
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
                                placeholder="Search"
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
                                        <button className="text-green-500 hover:text-green-700">
                                            <FaEye />
                                        </button>
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FaEdit />
                                        </button>
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
                </div>
            );
        } else {
            return <p className="text-center mt-8">Loading... Please wait...</p>;
        }
    }
    return renderElement();
};

export default Index;

/* import React, { useEffect, useState } from 'react';
import AuthService from '../AuthService';
import { FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';

const Index = () => {
  const { http } = AuthService();
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [currentPage, searchTerm]);

  const fetchAuthors = async () => {
    try {
      const response = await http.get('/authors', {
        params: {
          page: currentPage,
          email: searchTerm, // Pass search term as 'email' for simplicity
          // Add other search criteria here if needed, e.g., phone: searchTerm
        }
      });
      setAuthors(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleDelete = async (authorId) => {
    try {
      await http.delete(`/authors/${authorId}`);
      fetchAuthors(); // Optionally, update state or refetch authors after deletion
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const truncateBio = (bio) => {
    const words = bio.split(' ');
    const maxLength = 10; // Maximum words for truncated bio
    if (words.length > maxLength) {
      return `${words.slice(0, maxLength).join(' ')} ... `;
    }
    return bio;
  };

  const renderBioWithReadMore = (bio) => {
    const maxLength = 5; // Maximum words for truncated bio
    const words = bio.split(' ');
    if (words.length <= maxLength) {
      return bio;
    } else {
      const truncatedBio = words.slice(0, maxLength).join(' ');
      return (
        <>
          {truncatedBio}{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Read more
          </a>
        </>
      );
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authors</h1>
        <div className="relative text-gray-600">
          <input
            type="text"
            placeholder="Search by email"
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
            <th className="py-2 px-4 border-b">S.No.</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Bio</th>
            <th className="py-2 px-4 border-b">Books Authored</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{author.firstName}</td>
              <td className="py-2 px-4 border-b">{author.lastName}</td>
              <td className="py-2 px-4 border-b">{author.email}</td>
              <td className="py-2 px-4 border-b">{author.phone}</td>
              <td className="py-2 px-4 border-b">
                {renderBioWithReadMore(author.bio)}
              </td>
              <td className="py-2 px-4 border-b">{author.books.length}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit /> <FaEye className="inline-block ml-1" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(author.id)}
                >
                  <FaTrash /> <FaEye className="inline-block ml-1" />
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
    </div>
  );
};

export default Index; */


