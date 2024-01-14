import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const MotorcycleListings = () => {
  
  const { isAuthenticated , userData} = useAuth();
  const [isListingCreated, setIsListingCreated] = useState(false);
  const [newMotorcycle, setNewMotorcycle] = useState({
    description: '',
    price: 0,
    firstRegistration: '',
    enginePower: 0,
    motorcycleBrandId: 0,
    motorcycleModelId: 0,
    motorcycleConditionId: 0,
    motorcycleColorId: 0,
    motorcycleFuelTypeId: 0,
    motorcycleMileageId: 0,
    motorcycleTransmissionId: 0,
    motorcycleTypeId: 0,
    motorcycleYearId: 0,
    files: [],
  });

  const [motorcycleBrands, setMotorcycleBrands] = useState([]);
  const [motorcycleModels, setMotorcycleModels] = useState([]);
  const [motorcycleConditions, setMotorcycleConditions] = useState([]);
  const [motorcycleColors, setMotorcycleColors] = useState([]);
  const [motorcycleFuelTypes, setMotorcycleFuelTypes] = useState([]);
  const [motorcycleMileages, setMotorcycleMileages] = useState([]);
  const [motorcycleTransmissions, setMotorcycleTransmissions] = useState([]);
  const [motorcycleTypes, setMotorcycleTypes] = useState([]);
  const [motorcycleYears, setMotorcycleYears] = useState([]);
  useEffect(() => {
    console.log('User Data:', userData);
  }, [userData]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const brandsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleBrands');
        setMotorcycleBrands(brandsResponse.data);

        const modelsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleModels');
        setMotorcycleModels(modelsResponse.data);

        const conditionsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleConditions');
        setMotorcycleConditions(conditionsResponse.data);

        const colorsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleColors');
        setMotorcycleColors(colorsResponse.data);

        const fuelTypesResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleFuelTypes');
        setMotorcycleFuelTypes(fuelTypesResponse.data);

        const mileagesResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleMileages');
        setMotorcycleMileages(mileagesResponse.data);

        const transmissionsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleTransmissions');
        setMotorcycleTransmissions(transmissionsResponse.data);

        const typesResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleTypes');
        setMotorcycleTypes(typesResponse.data);

        const yearsResponse = await axios.get('https://localhost:7136/api/ApiMotorcycle/GetMotorcycleYears');
        setMotorcycleYears(yearsResponse.data);
      } catch (error) {
        console.error('Error fetching motorcycle dropdown options:', error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleInputChange = (e) => {
    setNewMotorcycle({
      ...newMotorcycle,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    setNewMotorcycle({
      ...newMotorcycle,
      files: Array.from(e.target.files),
    });
    
  };
  const handleSave = async () => {
    try{
      const formData = new FormData();
      formData.append('description', newMotorcycle.description);
      formData.append('price', newMotorcycle.price);
      formData.append('firstRegistration', newMotorcycle.firstRegistration);
      formData.append('enginePower', newMotorcycle.enginePower);
      formData.append('motorcycleBrandId', newMotorcycle.motorcycleBrandId);
      formData.append('motorcycleModelId', newMotorcycle.motorcycleModelId);
      formData.append('motorcycleConditionId', newMotorcycle.motorcycleConditionId);
      formData.append('motorcycleColorId', newMotorcycle.motorcycleColorId);
      formData.append('motorcycleFuelTypeId', newMotorcycle.motorcycleFuelTypeId);
      formData.append('motorcycleMileageId', newMotorcycle.motorcycleMileageId);
      formData.append('motorcycleTransmissionId', newMotorcycle.motorcycleTransmissionId);
      formData.append('motorcycleTypeId', newMotorcycle.motorcycleTypeId);
      formData.append('motorcycleYearId', newMotorcycle.motorcycleYearId);
      
      formData.append('userId', userData.userId);

      for (let i = 0; i < newMotorcycle.files.length; i++) {
        formData.append('Files', newMotorcycle.files[i]);
      }
      await axios.post('https://localhost:7136/api/ApiMotorcycle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Motorcycle saved successfully!');
      setIsListingCreated(true); 
      window.location.href = '/admin';

      
    }catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        console.log('Validation errors:', error.response.data.errors);
      } else {
        console.error('Error saving motorcycle:', error);
      }
    }
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
   
  return (
    <div className="container mx-auto mt-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl mb-4">Add a New Motorcycle Listing</h1>
        {isListingCreated && (
          <div className="bg-green-200 p-2 mb-4 rounded text-green-800">
            Listing created successfully!
          </div>
        )}
        <div className="flex flex-col gap-4">
          <label>Description:</label>
          <input type="text" name="description" value={newMotorcycle.description} onChange={handleInputChange} />
  
          <label>Price:</label>
          <input type="number" name="price" value={newMotorcycle.price} onChange={handleInputChange} />
  
          <label>First Registration:</label>
          <input type="date" name="firstRegistration" value={newMotorcycle.firstRegistration} onChange={handleInputChange} />
  
          <label>Engine Power:</label>
          <input type="number" name="enginePower" value={newMotorcycle.enginePower} onChange={handleInputChange} />
  
          <label>Motorcycle Brand:</label>
          <select name="motorcycleBrandId" value={newMotorcycle.motorcycleBrandId} onChange={handleInputChange}>
            <option value={0}>Select Brand</option>
            {motorcycleBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
  
          <label>Motorcycle Mileage:</label>
          <select name="motorcycleMileageId" value={newMotorcycle.motorcycleMileageId} onChange={handleInputChange}>
            <option value={0}>Select Mileage</option>
            {motorcycleMileages.map((mileage) => (
              <option key={mileage.id} value={mileage.id}>
                {mileage.mileage}
              </option>
            ))}
          </select>
  
    
          <label>Motorcycle Model:</label>
          <select name="motorcycleModelId" value={newMotorcycle.motorcycleModelId} onChange={handleInputChange}>
            <option value={0}>Select Model</option>
            {motorcycleModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.modelName}
              </option>
            ))}
          </select>
  
   
          <label>Motorcycle Condition:</label>
          <select name="motorcycleConditionId" value={newMotorcycle.motorcycleConditionId} onChange={handleInputChange}>
            <option value={0}>Select Condition</option>
            {motorcycleConditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.condition}
              </option>
            ))}
          </select>
  
       
          <label>Motorcycle Color:</label>
          <select name="motorcycleColorId" value={newMotorcycle.motorcycleColorId} onChange={handleInputChange}>
            <option value={0}>Select Color</option>
            {motorcycleColors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.color}
              </option>
            ))}
          </select>

<label>Motorcycle Type:</label>
<select name="motorcycleTypeId" value={newMotorcycle.motorcycleTypeId} onChange={handleInputChange}>
  <option value={0}>Select Type</option>
  {motorcycleTypes.map((type) => (
    <option key={type.id} value={type.id}>
      {type.type}
    </option>
  ))}
</select>

<label>Motorcycle Transmission:</label>
<select name="motorcycleTransmissionId" value={newMotorcycle.motorcycleTransmissionId} onChange={handleInputChange}>
  <option value={0}>Select Transmission Type</option>
  {motorcycleTransmissions.map((transmission) => (
    <option key={transmission.id} value={transmission.id}>
      {transmission.transmission}
    </option>
  ))}
</select>


<label>Motorcycle Fuel Type:</label>
<select name="motorcycleFuelTypeId" value={newMotorcycle.motorcycleFuelTypeId} onChange={handleInputChange}>
  <option value={0}>Select Fuel Type</option>
  {motorcycleFuelTypes.map((fuel) => (
    <option key={fuel.id} value={fuel.id}>
      {fuel.fuel}
    </option>
  ))}
</select>

<label>Motorcycle Year:</label>
<select name="motorcycleYearId" value={newMotorcycle.motorcycleYearId} onChange={handleInputChange}>
  <option value={0}>Select Year</option>
  {motorcycleYears.map((yearOfProduction) => (
    <option key={yearOfProduction.id} value={yearOfProduction.id}>
      {yearOfProduction.yearOfProduction}
    </option>
  ))}
   <input type="hidden" name="userId" value={newMotorcycle.userId} />
</select>
          <label>Photos:</label>
          <input type="file" name="motorcyclePhotos" multiple onChange={handleFileChange} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSave}>
            Save Motorcycle
          </button>
        </div>
      </div>
    </div>
  );
  

}

export default MotorcycleListings