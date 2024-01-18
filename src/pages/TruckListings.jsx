import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const TruckListings = () => {
  const { isAuthenticated, userData } = useAuth();
  const [isListingCreated, setIsListingCreated] = useState(false);
  const [newTruck, setNewTruck] = useState({
    description: '',
    price: 0,
    firstRegistration: '',
    enginePower: 0,
    location: 0,
    features: 0,
    truckBrandId: 0,
    truckModelId: 0,
    truckConditionId: 0,
    truckColorId: 0,
    truckFuelTypeId: 0,
    truckMileageId: 0,
    truckTransmissionTypeId: 0,
    truckVersionId: 0,
    truckLoadCapacity: 0,
    files: [],
  });

  const [truckBrands, setTruckBrands] = useState([]);
  const [truckModels, setTruckModels] = useState([]);
  const [truckConditions, setTruckConditions] = useState([]);
  const [truckColors, setTruckColors] = useState([]);
  const [truckFuelTypes, setTruckFuelTypes] = useState([]);
  const [truckMileages, setTruckMileages] = useState([]);
  const [truckTransmissions, setTruckTransmissions] = useState([]);
  const [truckVersions, setTruckVersions] = useState([]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const brandsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckBrands');
        setTruckBrands(brandsResponse.data);

        const modelsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckModels');
        setTruckModels(modelsResponse.data);

        const conditionsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckConditions');
        setTruckConditions(conditionsResponse.data);

        const colorsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckColors');
        setTruckColors(colorsResponse.data);

        const fuelTypesResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckFuelTypes');
        setTruckFuelTypes(fuelTypesResponse.data);

        const mileagesResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckMileages');
        setTruckMileages(mileagesResponse.data);

        const transmissionsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckTransmissionTypes');
        setTruckTransmissions(transmissionsResponse.data);

        const versionsResponse = await axios.get('https://localhost:7136/api/ApiTruck/GetTruckVersions');
        setTruckVersions(versionsResponse.data);
      } catch (error) {
        console.error('Error fetching truck dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleInputChange = (e) => {
    setNewTruck({
      ...newTruck,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewTruck({
      ...newTruck,
      files: Array.from(e.target.files),
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('description', newTruck.description);
      formData.append('price', newTruck.price);
      formData.append('firstRegistration', newTruck.firstRegistration);
      formData.append('enginePower', newTruck.enginePower);
      formData.append('location', newTruck.location);
      formData.append('features', newTruck.features);
      formData.append('truckBrandId', newTruck.truckBrandId);
      formData.append('truckModelId', newTruck.truckModelId);
      formData.append('truckConditionId', newTruck.truckConditionId);
      formData.append('truckColorId', newTruck.truckColorId);
      formData.append('truckFuelTypeId', newTruck.truckFuelTypeId);
      formData.append('truckMileageId', newTruck.truckMileageId);
      formData.append('truckTransmissionTypeId', newTruck.truckTransmissionTypeId);
      formData.append('truckVersionId', newTruck.truckVersionId);
      formData.append('truckLoadCapacity', newTruck.truckLoadCapacity);
      formData.append('userId', userData.userId);

      for (let i = 0; i < newTruck.files.length; i++) {
        formData.append('Files', newTruck.files[i]);
      }

      await axios.post('https://localhost:7136/api/ApiTruck', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Truck saved successfully!');
      setIsListingCreated(true);
      // Redirect to the desired page after successful listing creation
      // For example, redirect to '/admin'
      window.location.href = '/admin';
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        console.log('Validation errors:', error.response.data.errors);
      } else {
        console.error('Error saving truck:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto mt-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl mb-4">Add a New Truck Listing</h1>
        {isListingCreated && (
          <div className="bg-green-200 p-2 mb-4 rounded text-green-800">
            Listing created successfully!
          </div>
        )}
        <div className="flex flex-col gap-4">
          <label>Description:</label>
          <input type="text" name="description" value={newTruck.description} onChange={handleInputChange} />

          <label>Price:</label>
          <input type="number" name="price" value={newTruck.price} onChange={handleInputChange} />

          <label>First Registration:</label>
          <input type="date" name="firstRegistration" value={newTruck.firstRegistration} onChange={handleInputChange} />

          <label>Engine Power:</label>
          <input type="number" name="enginePower" value={newTruck.enginePower} onChange={handleInputChange} />

          <label>Location:</label>
          <input type="text" name="location" value={newTruck.location} onChange={handleInputChange} />

          <label>Features:</label>
          <input type="text" name="features" value={newTruck.features} onChange={handleInputChange} />

          <label>Truck Brand:</label>
          <select name="truckBrandId" value={newTruck.truckBrandId} onChange={handleInputChange}>
            <option value={0}>Select Brand</option>
            {truckBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>

          <label>Truck Mileage:</label>
<select name="truckMileageId" value={newTruck.truckMileageId} onChange={handleInputChange}>
  <option value={0}>Select Mileage</option>
  {truckMileages.map((mileage) => (
    <option key={mileage.id} value={mileage.id}>
      {mileage.mileage}
    </option>
  ))}
</select>

<label>Truck Model:</label>
<select name="truckModelId" value={newTruck.truckModelId} onChange={handleInputChange}>
  <option value={0}>Select Model</option>
  {truckModels.map((model) => (
    <option key={model.id} value={model.id}>
      {model.modelName}
    </option>
  ))}
</select>

<label>Truck Condition:</label>
<select name="truckConditionId" value={newTruck.truckConditionId} onChange={handleInputChange}>
  <option value={0}>Select Condition</option>
  {truckConditions.map((condition) => (
    <option key={condition.id} value={condition.id}>
      {condition.condition}
    </option>
  ))}
</select>

<label>Truck Color:</label>
<select name="truckColorId" value={newTruck.truckColorId} onChange={handleInputChange}>
  <option value={0}>Select Color</option>
  {truckColors.map((color) => (
    <option key={color.id} value={color.id}>
      {color.color}
    </option>
  ))}
</select>

<label>Truck Transmission:</label>
<select name="truckTransmissionTypeId" value={newTruck.truckTransmissionTypeId} onChange={handleInputChange}>
  <option value={0}>Select Transmission Type</option>
  {truckTransmissions.map((transmission) => (
    <option key={transmission.id} value={transmission.id}>
      {transmission.transmissionType}
    </option>
  ))}
</select>
<label>Truck Transmission:</label>
<select name="truckTransmissionTypeId" value={newTruck.truckTransmissionTypeId} onChange={handleInputChange}>
  <option value={0}>Select Transmission Type</option>
  {truckTransmissions.map((transmission) => (
    <option key={transmission.id} value={transmission.id}>
      {transmission.transmissionType}
    </option>
  ))}
</select>

<label>Truck Fuel Type:</label>
<select name="truckFuelTypeId" value={newTruck.truckFuelTypeId} onChange={handleInputChange}>
  <option value={0}>Select Fuel Type</option>
  {truckFuelTypes.map((fuelType) => (
    <option key={fuelType.id} value={fuelType.id}>
      {fuelType.fuelType}
    </option>
  ))}
</select>

<label>Truck Version:</label>
<select name="truckVersionId" value={newTruck.truckVersionId} onChange={handleInputChange}>
  <option value={0}>Select Version</option>
  {truckVersions.map((version) => (
    <option key={version.id} value={version.id}>
      {version.versionType}
    </option>
  ))}
</select>

<label>Truck Load Capacity:</label>
<input type="number" name="truckLoadCapacity" value={newTruck.truckLoadCapacity} onChange={handleInputChange} />
          <label>Photos:</label>
          <input type="file" name="truckPhotos" multiple onChange={handleFileChange} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>
            Save Truck
          </button>
        </div>
      </div>
    </div>
  );
};

export default TruckListings;
