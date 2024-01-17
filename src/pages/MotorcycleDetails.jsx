import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const MotorcycleDetails = () => {
    const { id } = useParams();
    const [motorcycle, setMotorcycle] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
  
    useEffect(() => {
      const fetchMotorcycleDetails = async () => {
        try {
          const response = await axios.get(`https://localhost:7136/api/ApiMotorcycle/${id}`);
          setMotorcycle(response.data);
          setSelectedPhoto(response.data.motorcyclePhotos[0]);
        } catch (error) {
          console.error('Error fetching motorcycle details:', error);
        }
      };
  
      fetchMotorcycleDetails();
    }, [id]);
  
    if (!motorcycle) {
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
                    alt={`Motorcycle Photo ${motorcycle.id}`}
                    className="w-full h-auto rounded-md mb-4 cursor-pointer shadow-md"
                  />
                  <div className="flex flex-wrap justify-start">
                    {motorcycle.motorcyclePhotos.map((photo, index) => (
                      <div key={photo.id} className="w-1/3 p-2">
                        <img
                          src={`data:${photo.contentType};base64,${photo.photoData}`}
                          alt={`Motorycle Photo ${motorcycle.id}`}
                          className="w-full h-auto rounded-md cursor-pointer transition duration-300 transform hover:scale-105"
                          onClick={() => openModal(photo)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <h1 className="text-4xl font-bold mb-4 text-blue-700">{motorcycle.motorcycleBrand?.brandName} {motorcycle.motorcycleModel?.modelName}</h1>
                  <p className="text-gray-700 mb-2">Condition: {motorcycle.motorcycleCondition?.condition}</p>
                  <p className="text-gray-700 mb-2">Color: {motorcycle.motorcycleColor?.color}</p>
                  <p className="text-gray-700 mb-2">Fuel Type: {motorcycle.motorcycleFuelType?.fuel}</p>
                  <p className="text-gray-700 mb-2">Transmission Type: {motorcycle.motorcycleTransmission?.transmission}</p>
                  <p className="text-gray-700 mb-2">Mileage: {motorcycle.motorcycleMileage?.mileage}</p>
                  <p className="text-gray-700 mb-2">Location: {motorcycle.location}</p>
                  <p className="text-gray-700 mb-2">First Registration: {motorcycle.firstRegistration}</p>
                  <p className="text-gray-800 mt-4">{motorcycle.description}</p>
                  {motorcycle.user && (
                    <div className="mt-4">
                      <p className="text-gray-700">Listed by: {motorcycle.user.email}</p>
                      <p className="text-gray-700">Phone Number: {motorcycle.user.phoneNumber}</p>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mt-6 text-green-600">{motorcycle.price}€</h3>
                </div>
              </div>
            </div>
          );
};

export default MotorcycleDetails