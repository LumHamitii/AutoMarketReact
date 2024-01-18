import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate  } from 'react-router-dom';


const CarList = () => {
  const [cars, setCars] = useState([]);
  const { userData } = useAuth();
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      if (userData && userData.userId) {
        const response = await axios.get('https://localhost:7136/api/ApiCar');
        const userCars = response.data.filter(car => car.userId === userData.userId);
        console.log('API Response:', userCars);
        setCars(userCars);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleEdit = (carId) => {
    // Navigate to the Edit page for the specific car
    navigate(`/edit-car/${carId}`);
  };
  const handleDelete = async (carId) => {
    try {
      await axios.delete(`https://localhost:7136/api/ApiCar/${carId}`);
      // After successful delete, fetch cars again to update the list
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };
  
  useEffect(() => {
    fetchCars();
  }, [userData]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Cars List</h1>
      <h3>
        <Link to="/cars-listing" className="text-blue-500">
          <li className="p-4 list-none">
            Create a new car listing
          </li>
        </Link>
      </h3>
      <ul>
        {cars.map(car => (
          <li key={car.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <strong>Brand:</strong> {car.carBrand ? car.carBrand.brandName : 'N/A'}<br/>
              <strong>Description:</strong> {car.description}<br />
              <strong>Price:</strong> {car.price}€<br />
            </div>
            <button 
              onClick={() => handleEdit(car.id)} 
              className="bg-green-500 text-white rounded py-2 px-4 hover:bg-red-600"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(car.id)} 
              className="bg-red-500 text-white rounded py-2 px-4 hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
