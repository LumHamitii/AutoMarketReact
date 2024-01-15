import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const AdminData = () => {
  const [carCount, setCarCount] = useState(0);
  const [motorcycleCount, setMotorcycleCount] = useState(0);
  const { userData } = useAuth();

  const fetchVehicleCount = async () => {
    try {
      if (userData && userData.userId) {
        // Fetch car count
        const carResponse = await axios.get(`https://localhost:7136/api/ApiCar`);
        const userCars = carResponse.data.filter(car => car.userId === userData.userId);
        setCarCount(userCars.length);

        // Fetch motorcycle count
        const motorcycleResponse = await axios.get(`https://localhost:7136/api/ApiMotorcycle`);
        const userMotorcycles = motorcycleResponse.data.filter(
          motorcycle => motorcycle.userId === userData.userId
        );
        setMotorcycleCount(userMotorcycles.length);
      }
    } catch (error) {
      console.error('Error fetching vehicle count:', error);
    }
  };

  useEffect(() => {
    fetchVehicleCount();
  }, [userData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Cars Added</h2>
        <div className="flex items-center">
          <span className="text-4xl mr-2">{carCount}</span>
          <img src="/carIcon.png" alt="Car Icon" className="w-9 h-9" />
        </div>
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Motorcycles Added</h2>
        <div className="flex items-center">
          <span className="text-4xl mr-2">{motorcycleCount}</span>
          <img src="/motorcycleIcon.png" alt="Motorcycle Icon" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default AdminData;
