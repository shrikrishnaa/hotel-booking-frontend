import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [filter, setFilter] = useState(''); // State to store the filter

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await API.get('/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Update the filter state based on input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter hotels based on location
  const filteredHotels = hotels.filter(hotel => 
    hotel.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Hotels</h1>
      <input 
        type="text" 
        placeholder="Filter by location" 
        value={filter} 
        onChange={handleFilterChange} 
      />
      <ul>
        {filteredHotels.map((hotel) => (
          <li key={hotel.id}>
            <h2>{hotel.name}</h2>
            <p>{hotel.location}</p>
            <Link to="/create-hotel" className="create-hotel-link">Create New Hotel</Link>
            <Link to={`/hotels/${hotel.id}`}>View</Link>
            <Link to={`/edit-hotel/${hotel.id}`}>Edit</Link>
            <Link to={`/book-hotel/${hotel.id}`}>Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotelList;