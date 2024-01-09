import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const CarFilter = () => {
    const navigate = useNavigate();
    const [carBrands, setCarBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [carConditions, setCarConditions] = useState([]);
    const [carColors, setCarColors] = useState([]);
    const [carFuelTypes, setCarFuelTypes] = useState([]);
    const [carMileages, setCarMileages] = useState([]);
    const [carSeats, setCarSeats] = useState([]);
    const [carTransmissionTypes, setCarTransmissionTypes] = useState([]);
    const [carVersions, setCarVersions] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);


  const [filter, setFilter] = useState({
    carBrandId: null,
    carModelId: null,
    carConditionId: null,
    carColorId: null,
    carFuelTypeId: null,
    carMileageId: null,
    carSeatsId: null,
    carTransmissionTypeId: null,
    carVersionId: null,
    endDate: null,
  });


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
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, name) => {
    setFilter({
      ...filter,
      [name]: date,
    });
  };

  const handleFilter = async () => {
    try {
      
      console.log('Filter:', filter); 
      const response = await axios.get('https://localhost:7136/api/ApiCar/filter', {
        params: filter,
      });
      console.log('API Response:', response.data); 
      setFilteredCars(response.data);
      navigate('/filtered-cars', { state: { filteredCars: response.data } });

        } catch (error) {
      console.error('Error filtering cars:', error);
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">Filter Cars</h1>

      <div className="flex flex-col gap-4">
      <label>Car Brand:</label>
          <select name="carBrandId" value={filter.carBrandId} onChange={handleInputChange}>
            <option value={0}>Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
          <label>Car Mileage:</label>
          <select name="carMileageId" value={filter.carMileageId} onChange={handleInputChange}>
            <option value={0}>Select Brand</option>
            {carMileages.map((mileage) => (
              <option key={mileage.id} value={mileage.id}>
                {mileage.mileage}
              </option>
            ))}
          </select>
  
          <label>Car Model:</label>
          <select name="carModelId" value={filter.carModelId} onChange={handleInputChange}>
            <option value={0}>Select Model</option>
            {carModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.modelName}
              </option>
            ))}
          </select>
  
          <label>Car Condition:</label>
      <select name="carConditionId" value={filter.carConditionId} onChange={handleInputChange}>
        <option value={0}>Select Condition</option>
        {carConditions.map((condition) => (
          <option key={condition.id} value={condition.id}>
            {condition.condition}
          </option>
        ))}
      </select>

      <label>Car Color:</label>
      <select name="carColorId" value={filter.carColorId} onChange={handleInputChange}>
        <option value={0}>Select Color</option>
        {carColors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.color}
          </option>
        ))}
      </select>

      <label>Car Fuel Type:</label>
      <select name="carFuelTypeId" value={filter.carFuelTypeId} onChange={handleInputChange}>
        <option value={0}>Select Fuel Type</option>
        {carFuelTypes.map((fuelType) => (
          <option key={fuelType.id} value={fuelType.id}>
            {fuelType.fuelType}
          </option>
        ))}
      </select>

      <label>Car Seats:</label>
      <select name="carSeatsId" value={filter.carSeatsId} onChange={handleInputChange}>
        <option value={0}>Select Seats</option>
        {carSeats.map((seat) => (
          <option key={seat.id} value={seat.id}>
            {seat.numberofSeats}
          </option>
        ))}
      </select>

      <label>Car Transmission Type:</label>
      <select name="carTransmissionTypeId" value={filter.carTransmissionTypeId} onChange={handleInputChange}>
        <option value={0}>Select Transmission Type</option>
        {carTransmissionTypes.map((transmissionType) => (
          <option key={transmissionType.id} value={transmissionType.id}>
            {transmissionType.transmissionType}
          </option>
        ))}
      </select>

      <label>Car Version:</label>
      <select name="carVersionId" value={filter.carVersionId} onChange={handleInputChange}>
        <option value={0}>Select Version</option>
        {carVersions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.versionType}
          </option>
        ))}
      </select>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={filter.startDate || ''}
          onChange={(e) => handleDateChange(e.target.value, 'startDate')}
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={filter.endDate || ''}
          onChange={(e) => handleDateChange(e.target.value, 'endDate')}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleFilter}>
          Filter Cars
        </button>
      </div>

      
    </div>
    
  );
};

export default CarFilter;
