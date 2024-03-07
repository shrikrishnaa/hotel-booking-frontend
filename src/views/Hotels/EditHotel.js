import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

function EditHotel() {
  const { id } = useParams(); // Extracting hotel ID from URL
  const navigate = useNavigate();
  // Initialize state with all the fields that can be edited
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    description: '',
    rooms_count: 0, // Ensure you're capturing the number of rooms
  });

  // On component mount, fetch the hotel details to populate the form
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await API.get(`/hotels/${id}`);
        setHotelData({
          name: response.data.name,
          location: response.data.location,
          description: response.data.description,
          rooms_count: response.data.rooms_count, // Set the fetched rooms_count
        });
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };
    fetchHotelDetails();
  }, [id]); // Dependency array with id ensures this effect runs when the component mounts or the id changes

  // Update state upon form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for rooms_count to ensure it's stored as a number
    setHotelData({ ...hotelData, [name]: name === 'rooms_count' ? parseInt(value, 10) : value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/hotels/${id}`, hotelData);
      navigate(`/hotels/${id}`); // Navigate to the detail view of the edited hotel
    } catch (error) {
      console.error("Failed to update hotel:", error);
      // Handle failure (e.g., showing an error message)
    }
  };

  return (
    <div>
      <h2>Edit Hotel</h2>
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
          Description:
          <textarea name="description" value={hotelData.description} onChange={handleChange} required />
        </label>
        <label>
          Rooms Count:
          <input type="number" name="rooms_count" value={hotelData.rooms_count} onChange={handleChange} required min="1" />
        </label>
        <button type="submit">Update Hotel</button>
      </form>
    </div>
  );
}

export default EditHotel;