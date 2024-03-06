import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';

function BookHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [bookingData, setBookingData] = useState({
    numberOfRooms: 1,
    checkInDate: '',
    checkOutDate: '',
  });
  const [availableRooms, setAvailableRooms] = useState(0); // State to track available rooms

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await API.get(`/hotels/${id}`);
        setHotel(response.data);
        setAvailableRooms(response.data.rooms_count); // Assume this is the total available rooms
      } catch (error) {
        console.error('Failed to fetch hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numberOfRooms' && value > availableRooms) {
      alert(`Only ${availableRooms} rooms are available.`);
      return;
    }
    setBookingData({ ...bookingData, [name]: e.target.type === 'number' ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Additional validation could be implemented here
    try {
      await API.post('/bookings', {
        ...bookingData,
        hotelId: id,
      });
      alert('Booking successful!');
      navigate(`/hotels/${id}`); // Or to a booking confirmation page
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Book Your Stay</h2>
      {hotel && (
        <>
          <h3>{hotel.name}</h3>
          <p>{hotel.description}</p>
          <p>Available Rooms: {availableRooms}</p>
          {/* Display other relevant hotel details */}
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Rooms:
            <input
              type="number"
              name="numberOfRooms"
              value={bookingData.numberOfRooms}
              onChange={handleChange}
              min="1"
              max={availableRooms} // Ensure users can't request more rooms than available
              required
            />
          </label>
        </div>
        <div>
          <label>
            Check-in Date:
            <input
              type="date"
              name="checkInDate"
              value={bookingData.checkInDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Check-out Date:
            <input
              type="date"
              name="checkOutDate"
              value={bookingData.checkOutDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookHotel;