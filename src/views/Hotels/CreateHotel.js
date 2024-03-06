import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

function CreateHotel() {
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    description: '',
    rooms_count: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: name === 'rooms_count' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/hotels', { hotel: hotelData });
      navigate('/hotels'); // Redirect to hotels list after creation
    } catch (error) {
      console.error("Failed to create hotel", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={hotelData.name} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={hotelData.location} onChange={handleChange} required />
      </label>
      <label>
        Rooms Count:
        <input type="number" name="rooms_count" value={hotelData.rooms_count} onChange={handleChange} required min="1" />
      </label>
      <button type="submit">Create Hotel</button>
    </form>
  );
}

export default CreateHotel;