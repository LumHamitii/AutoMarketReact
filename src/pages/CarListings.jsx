// CarListings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const CarListings = () => {
  const { isAuthenticated , userData} = useAuth();
  const [newCar, setNewCar] = useState({
    description: '',
    price: 0,
    firstRegistration: '',
    enginePower: 0,
    features: '',
    location: '',
    carBrandId: 0,
    carModelId: 0,
    carConditionId: 0,
    carColorId: 0,
    carFuelTypeId: 0,
    carMileageId: 0,
    carSeatsId: 0,
    carTransmissionTypeId: 0,
    carVersionId: 0,
    files: [],
    userId: ''
  }
  );
 
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carConditions, setCarConditions] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [carFuelTypes, setCarFuelTypes] = useState([]);
  const [carMileages, setCarMileages] = useState([]);
  const [carSeats, setCarSeats] = useState([]);
  const [carTransmissionTypes, setCarTransmissionTypes] = useState([]);
  const [carVersions, setCarVersions] = useState([]);
  useEffect(() => {
    // Log user data to the console when userData changes
    console.log('User Data:', userData);
  }, [userData]);
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        
        const brandsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarBrands');
        setCarBrands(brandsResponse.data);

        const modelsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarModels');
        setCarModels(modelsResponse.data);

        const conditionsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarConditions');
        setCarConditions(conditionsResponse.data);

        const colorsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarColors');
        setCarColors(colorsResponse.data);

        const fuelTypesResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarFuelTypes');
        setCarFuelTypes(fuelTypesResponse.data);

        const mileagesResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarMileages');
        setCarMileages(mileagesResponse.data);

        const seatsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarSeats');
        setCarSeats(seatsResponse.data);

        const transmissionTypesResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarTransmissionTypes');
        setCarTransmissionTypes(transmissionTypesResponse.data);

        const versionsResponse = await axios.get('https://localhost:7136/api/ApiCar/GetCarVersions');
        setCarVersions(versionsResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
     
    };

    fetchDropdownOptions();
  }, []);
  const handleInputChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setNewCar({
      ...newCar,
      files: e.target.files, 
    });
  };
  
  const handleSave = async () => {
    try {
      const formData = new FormData();
  
      formData.append('description', newCar.description);
      formData.append('price', newCar.price);
      formData.append('firstRegistration', newCar.firstRegistration);
      formData.append('enginePower', newCar.enginePower);
      formData.append('features', newCar.features);
      formData.append('location', newCar.location);
      formData.append('carBrandId', newCar.carBrandId);
      formData.append('carModelId', newCar.carModelId);
      formData.append('carConditionId', newCar.carConditionId);
      formData.append('carColorId', newCar.carColorId);
      formData.append('carFuelTypeId', newCar.carFuelTypeId);
      formData.append('carMileageId', newCar.carMileageId);
      formData.append('carSeatsId', newCar.carSeatsId);
      formData.append('carTransmissionTypeId', newCar.carTransmissionTypeId);
      formData.append('carVersionId', newCar.carVersionId);
  
      formData.append('userId', userData.userId);

      for (let i = 0; i < newCar.files.length; i++) {
        formData.append('Files', newCar.files[i]);
      }
  
      await axios.post('https://localhost:7136/api/ApiCar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Car saved successfully!');
      window.location.href = '/admin';
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        console.log('Validation errors:', error.response.data.errors);
      } else {
        console.error('Error saving car:', error);
      }
    }
  };
  
 
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    
      <div className="container mx-auto mt-8 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl mb-4">Add a New Car Listing</h1>
        <div className="flex flex-col gap-4">
        <label>Description:</label>
      <input type="text" name="description" value={newCar.description} onChange={handleInputChange} />

      <label>Price:</label>
      <input type="number" name="price" value={newCar.price} onChange={handleInputChange} />

      <label>First Registration:</label>
      <input type="date" name="firstRegistration" value={newCar.firstRegistration} onChange={handleInputChange} />

      <label>Engine Power:</label>
      <input type="number" name="enginePower" value={newCar.enginePower} onChange={handleInputChange} />

      <label>Features:</label>
      <input type="text" name="features" value={newCar.features} onChange={handleInputChange} />

      <label>Location:</label>
      <input type="text" name="location" value={newCar.location} onChange={handleInputChange} />
  
          <label>Car Brand:</label>
          <select name="carBrandId" value={newCar.carBrandId} onChange={handleInputChange}>
            <option value={0}>Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
          <label>Car Mileage:</label>
          <select name="carMileageId" value={newCar.carMileageId} onChange={handleInputChange}>
            <option value={0}>Select Mileage</option>
            {carMileages.map((mileage) => (
              <option key={mileage.id} value={mileage.id}>
                {mileage.mileage}
              </option>
            ))}
          </select>
  
          <label>Car Model:</label>
          <select name="carModelId" value={newCar.carModelId} onChange={handleInputChange}>
            <option value={0}>Select Model</option>
            {carModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.modelName}
              </option>
            ))}
          </select>
  
          <label>Car Condition:</label>
      <select name="carConditionId" value={newCar.carConditionId} onChange={handleInputChange}>
        <option value={0}>Select Condition</option>
        {carConditions.map((condition) => (
          <option key={condition.id} value={condition.id}>
            {condition.condition}
          </option>
        ))}
      </select>

      <label>Car Color:</label>
      <select name="carColorId" value={newCar.carColorId} onChange={handleInputChange}>
        <option value={0}>Select Color</option>
        {carColors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.color}
          </option>
        ))}
      </select>

      <label>Car Fuel Type:</label>
      <select name="carFuelTypeId" value={newCar.carFuelTypeId} onChange={handleInputChange}>
        <option value={0}>Select Fuel Type</option>
        {carFuelTypes.map((fuelType) => (
          <option key={fuelType.id} value={fuelType.id}>
            {fuelType.fuelType}
          </option>
        ))}
      </select>

      <label>Car Seats:</label>
      <select name="carSeatsId" value={newCar.carSeatsId} onChange={handleInputChange}>
        <option value={0}>Select Seats</option>
        {carSeats.map((seat) => (
          <option key={seat.id} value={seat.id}>
            {seat.numberofSeats}
          </option>
        ))}
      </select>

      <label>Car Transmission Type:</label>
      <select name="carTransmissionTypeId" value={newCar.carTransmissionTypeId} onChange={handleInputChange}>
        <option value={0}>Select Transmission Type</option>
        {carTransmissionTypes.map((transmissionType) => (
          <option key={transmissionType.id} value={transmissionType.id}>
            {transmissionType.transmissionType}
          </option>
        ))}
      </select>

      <label>Car Version:</label>
      <select name="carVersionId" value={newCar.carVersionId} onChange={handleInputChange}>
        <option value={0}>Select Version</option>
        {carVersions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.versionType}
          </option>
        ))}
        <input type="hidden" name="userId" value={newCar.userId} />
      </select>
         <label>Photos:</label>
          <input type="file" name="photos" multiple onChange={handleFileChange} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>Save Car</button>
        </div>
      </div>
      </div>
    );
};

export default CarListings;
