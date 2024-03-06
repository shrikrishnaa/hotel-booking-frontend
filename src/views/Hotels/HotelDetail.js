import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';

function HotelDetail() {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await API.get(`/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Failed to fetch hotel details", error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>Location: {hotel.location}</p>
      <p>Description: {hotel.description}</p>
      {/* Display more hotel details as needed */}
    </div>
  );
}

export default HotelDetail;
