// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import HotelList from './views/Hotels/HotelList';
import HotelDetail from './views/Hotels/HotelDetail';
import BookHotel from './views/Booking/BookHotel';
import CreateHotel from './views/Hotels/CreateHotel';
import EditHotel from './views/Hotels/EditHotel';
import './App.css'; // Your App's CSS

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/book-hotel/:id" element={<BookHotel />} />
          <Route path="/create-hotel" element={<CreateHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;