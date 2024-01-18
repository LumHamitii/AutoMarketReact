import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TruckDetails = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7136/api/ApiTruck/${id}`);
        setTruck(response.data);
        setSelectedPhoto(response.data.truckPhotos[0]);
      } catch (error) {
        console.error('Error fetching truck details:', error);
      }
    };

    fetchTruckDetails();
  }, [id]);

  if (!truck) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 md:flex">
        <div className="md:w-1/2">
          <img
            src={`data:${selectedPhoto?.contentType};base64,${selectedPhoto?.photoData}`}
            alt={`Truck Photo ${truck.id}`}
            className="w-full h-auto rounded-md mb-4 cursor-pointer shadow-md"
          />
          <div className="flex flex-wrap justify-start">
            {truck.truckPhotos.map((photo, index) => (
              <div key={photo.id} className="w-1/3 p-2">
                <img
                  src={`data:${photo.contentType};base64,${photo.photoData}`}
                  alt={`Truck Photo ${truck.id}`}
                  className="w-full h-auto rounded-md cursor-pointer transition duration-300 transform hover:scale-105"
                  onClick={() => openModal(photo)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">{truck.truckBrand?.brandName} {truck.truckModel?.modelName}</h1>
          <p className="text-gray-700 mb-2">Color: {truck.truckColor?.color}</p>
          <p className="text-gray-700 mb-2">Transmission Type: {truck.truckTransmissionType?.transmissionType}</p>
          <p className="text-gray-700 mb-2">Mileage: {truck.truckMileage?.mileage}</p>
          <p className="text-gray-700 mb-2">Location: {truck.location}</p>
          <p className="text-gray-800 mt-4">Desription: {truck.description}</p>
          {truck.user && (
            <div className="mt-4">
              <p className="text-gray-700">Listed by: {truck.user.email}</p>
              <p className="text-gray-700">Phone Number: {truck.user.phoneNumber}</p>
            </div>
          )}
          <h3 className="text-2xl font-bold mt-6 text-green-600">{truck.price}€</h3>
        </div>
      </div>
    </div>
  );
};

export default TruckDetails;
