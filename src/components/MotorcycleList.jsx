import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MotorcycleList = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const { userData } = useAuth();
  const navigate = useNavigate();

  const fetchMotorcycles = async () => {
    try {
      if (userData && userData.userId) {
        const response = await axios.get('https://localhost:7136/api/ApiMotorcycle');
        const userMotorcycles = response.data.filter(motorcycle => motorcycle.userId === userData.userId);
        setMotorcycles(userMotorcycles);
      }
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
    }
  };
  const handleEdit = (motorcycleId) => {
    
    navigate(`/edit-motorcycle/${motorcycleId}`);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7136/api/ApiMotorcycle/${id}`);
      setMotorcycles(prevMotorcycles => prevMotorcycles.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting motorcycle:', error);
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, [userData]);

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
          <li key={motorcycle.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <strong>Brand:</strong> {motorcycle.motorcycleBrand ? motorcycle.motorcycleBrand.brandName : 'N/A'}<br/>
              <strong>Description:</strong> {motorcycle.description}<br />
              <strong>Price:</strong> {motorcycle.price}<br />
            </div>
            <button 
              onClick={() => handleEdit(motorcycle.id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(motorcycle.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
