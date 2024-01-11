import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CarList = () => {
    
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7136/api/ApiCar')
          .then(response => setCars(response.data))
          .catch(error => console.error('Error fetching cars:', error));

      }, []);

      const handleDelete = async (id) => {
        try {
          await axios.delete(`https://localhost:7136/api/ApiCar/${id}`);
          
          // Update the list of motorcycles after deletion
          setCars(prevCars => prevCars.filter(c => c.id !== id));
        } catch (error) {
          console.error('Error deleting motorcycle:', error);
        }
      };

      return (
        <div>
          <h1 className="text-3xl font-semibold mb-6">Cars List</h1>
          <h3>
            <Link to="/cars" className="text-blue-500">
              <li className="p-4 list-none">
                Create a new car listing
              </li>
            </Link>
          </h3>
          <ul>
            {cars.map(car => (
              <li key={car.id} className="flex justify-between items-center">
                <div>
                  {/* <strong>Brand:</strong> {car.carBrand ? car.motorcycleBrand.brandName : 'N/A'}<br/> */}
                  <strong>Description:</strong> {car.description}<br />
                  <strong>Price:</strong> {car.price}<br />
                </div>
                <button 
                  onClick={() => handleDelete(car.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default CarList