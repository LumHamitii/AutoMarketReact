import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const TruckList = () => {
    const [trucks, setTrucks] = useState([]);
    const { userData } = useAuth();
  
    const fetchTrucks = async () => {
      try {
        if (userData && userData.userId) {
          const response = await axios.get('https://localhost:7136/api/ApiTruck');
          const userTrucks = response.data.filter(truck => truck.userId === userData.userId);
          console.log('API Response:', userTrucks);
          setTrucks(userTrucks);
        }
      } catch (error) {
        console.error('Error fetching v:', error);
      }
    };
  
    const handleDelete = async (truckId) => {
      try {
        await axios.delete(`https://localhost:7136/api/ApiTruck/${truckId}`);
        // After successful delete, fetch trucks again to update the list
        fetchTrucks();
      } catch (error) {
        console.error('Error deleting truck:', error);
      }
    };
    
    useEffect(() => {
        fetchTrucks();
    }, [userData]);
  
    return (
      <div>
        <h1 className="text-3xl font-semibold mb-6">Trucks List</h1>
        <h3>
          <Link to="/trucks-listing" className="text-blue-500">
            <li className="p-4 list-none">
              Create a new truck listing
            </li>
          </Link>
        </h3>
        <ul>
          {trucks.map(truck => (
            <li key={truck.id} className="flex justify-between items-center p-4 border-b">
              <div>
                <strong>Brand:</strong> {truck.truckBrand ? truck.truckBrand.brandName : 'N/A'}<br/>
                <strong>Description:</strong> {truck.description}<br />
                <strong>Price:</strong> {truck.price}€<br />
              </div>
              <button 
                onClick={() => handleDelete(truck.id)} 
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


export default TruckList