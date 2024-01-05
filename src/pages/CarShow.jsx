import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarShow = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/ApiCar');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">Car Show</h1>
      <div className="flex flex-wrap">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="flex-grow w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
          <div className="border p-4 mb-4">
            <p>Brand: {car.carBrand?.brandName}</p> 
            <p>Model: {car.carModel?.modelName}</p>
            <p>Color: {car.carColor?.color}</p>
            <p>FuelType: {car.carFuelType?.fuelType}</p>
            <p>Mileage: {car.carMileage?.mileage}</p>
            <p>Location: {car.location}</p>
            <h3 className="text-xl font-bold">{car.price}$</h3>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default CarShow;
