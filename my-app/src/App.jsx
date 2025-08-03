
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Profilepage from './pages/Profilepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from "../context/AuthContext"; // Use named import

const App = () => {
  const { authUser } = useContext(AuthContext); // ✅ FIX: properly destructure authUser
  console.log("Auth User:", authUser);

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <ToastContainer />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;


