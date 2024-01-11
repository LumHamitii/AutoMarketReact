import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MotorcycleList = () => {
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {

    axios.get('https://localhost:7136/api/ApiMotorcycle')
      .then(response => setMotorcycles(response.data))
      .catch(error => console.error('Error fetching motorcycles:', error));
  }, []);

  const handleDelete = async (id) => {
    try {

        await axios.delete(`https://localhost:7136/api/ApiMotorcycle/${id}`);
      

        setMotorcycles(prevMotorcycles => prevMotorcycles.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting motorcycle:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Motorcycles List</h1>
      <h3>
        <Link to="/motorcycle-listing" className="text-blue-500">
          <li className="p-4 list-none">
            Create a new motorcycle listing
          </li>
        </Link>
      </h3>
      <ul>
        {motorcycles.map(motorcycle => (
          <li key={motorcycle.id} className="flex justify-between items-center">
            <div>
              <strong>Brand:</strong> {motorcycle.motorcycleBrand ? motorcycle.motorcycleBrand.brandName : 'N/A'}<br/>
              <strong>Description:</strong> {motorcycle.description}<br />
              <strong>Price:</strong> {motorcycle.price}<br />
            </div>
            <button 
              onClick={() => handleDelete(motorcycle.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotorcycleList;
