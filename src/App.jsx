import React from 'react';
import AuthService from './AuthService';
import GuestLayout from './navbar/GuestLayout';
import AuthenticatedLayout from './navbar/AuthenticatedLayout';

function App() {

  const { getToken } = AuthService();

  if (!getToken()) {
    return <GuestLayout />;
  }

  return <AuthenticatedLayout />;

}

export default App;

