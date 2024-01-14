import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7136/api/ApiCar/${id}`);
        setCar(response.data);
        setSelectedPhoto(response.data.photos[0]);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
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
            alt={`Car Photo ${car.id}`}
            className="w-full h-auto rounded-md mb-4 cursor-pointer shadow-md"
          />
          <div className="flex flex-wrap justify-start">
            {car.photos.map((photo, index) => (
              <div key={photo.id} className="w-1/3 p-2">
                <img
                  src={`data:${photo.contentType};base64,${photo.photoData}`}
                  alt={`Car Photo ${car.id}`}
                  className="w-full h-auto rounded-md cursor-pointer transition duration-300 transform hover:scale-105"
                  onClick={() => openModal(photo)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">{car.carBrand?.brandName} {car.carModel?.modelName}</h1>
          <p className="text-gray-700 mb-2">Condition: {car.carCondition?.condition}</p>
          <p className="text-gray-700 mb-2">Color: {car.carColor?.color}</p>
          <p className="text-gray-700 mb-2">Fuel Type: {car.carFuelType?.fuelType}</p>
          <p className="text-gray-700 mb-2">Transmission Type: {car.carTransmissionType?.transmissionType}</p>
          <p className="text-gray-700 mb-2">Mileage: {car.carMileage?.mileage}</p>
          <p className="text-gray-700 mb-2">Seats: {car.carSeats?.numberofSeats}</p>
          <p className="text-gray-700 mb-2">Location: {car.location}</p>
          <p className="text-gray-700 mb-2">First Registration: {car.firstRegistration}</p>
          <p className="text-gray-800 mt-4">{car.description}</p>
          {car.user && (
            <div className="mt-4">
              <p className="text-gray-700">Listed by: {car.user.email}</p>
              <p className="text-gray-700">Phone Number: {car.user.phoneNumber}</p>
            </div>
          )}
          <h3 className="text-2xl font-bold mt-6 text-green-600">{car.price}€</h3>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
