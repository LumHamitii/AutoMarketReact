import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
 
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7136/api/ApiCar/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }
  
  return (
  
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">Car Details</h1>
      <div className="border p-4">
        <p>Brand: {car.carBrand?.brandName}</p>
        <p>Model: {car.carModel?.modelName}</p>
        <p>Engine Power: {car.enginePower}HP</p>
        <p>Condition: {car.carCondition?.condition}</p>
        <p>Color: {car.carColor?.color}</p>
        <p>Fuel Type: {car.carFuelType?.fuelType}</p>
        <p>Transmission Type: {car.carTransmissionType?.transmissionType}</p>
        <p>Mileage: {car.carMileage?.mileage}</p>
        <p>Seats: {car.carSeats?.numberofSeats}</p>
        <p>Location: {car.location}</p>
        <p>First Registration: {car.firstRegistration}</p>
        <p>Features: {car.features}</p>
        <p>Description: {car.description}</p>
        <h3 className="text-xl font-bold">{car.price}$</h3>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Photos:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {car.photos.map((photo) => (
              <div key={photo.id} style={{ margin: '10px' }}>
                <img
                  src={`data:${photo.contentType};base64,${photo.photoData}`}
                  alt={`Car Photo ${car.id}`}
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CarDetails;
