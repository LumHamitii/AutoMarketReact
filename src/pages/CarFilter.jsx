import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    brandId: '',
    modelId: '',
    conditionId: '',
    colorId: '',
    fuelTypeId: '',
    mileageId: '',
    seatsId: '',
    transmissionTypeId: '',
    versionId: '',
    startDate : '',
    endDate: '',
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
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
    <div className="container mx-auto mt-8 flex-grow">
      <h1 className="text-3xl mb-4">Filter Cars</h1>
  
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="text-sm">Car Brand:</label>
          <select
            name="brandId"
            value={filter.brandId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Mileage:</label>
          <select
            name="mileageId"
            value={filter.mileageId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Mileage</option>
            {carMileages.map((mileage) => (
              <option key={mileage.id} value={mileage.id}>
                {mileage.mileage}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Model:</label>
          <select
            name="modelId"
            value={filter.modelId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Model</option>
            {carModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.modelName}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Condition:</label>
          <select
            name="conditionId"
            value={filter.conditionId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Condition</option>
            {carConditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.condition}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Color:</label>
          <select
            name="colorId"
            value={filter.colorId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Color</option>
            {carColors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.color}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Fuel Type:</label>
          <select
            name="fuelTypeId"
            value={filter.fuelTypeId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Fuel Type</option>
            {carFuelTypes.map((fuelType) => (
              <option key={fuelType.id} value={fuelType.id}>
                {fuelType.fuelType}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Seats:</label>
          <select
            name="seatsId"
            value={filter.seatsId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Seats</option>
            {carSeats.map((seat) => (
              <option key={seat.id} value={seat.id}>
                {seat.numberofSeats}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Transmission Type:</label>
          <select
            name="transmissionTypeId"
            value={filter.transmissionTypeId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Transmission Type</option>
            {carTransmissionTypes.map((transmissionType) => (
              <option key={transmissionType.id} value={transmissionType.id}>
                {transmissionType.transmissionType}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Car Version:</label>
          <select
            name="versionId"
            value={filter.versionId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Version</option>
            {carVersions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.versionType}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filter.startDate || ''}
            onChange={(e) => handleDateChange(e.target.value, 'startDate')}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
  
        <div>
          <label className="text-sm">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filter.endDate || ''}
            onChange={(e) => handleDateChange(e.target.value, 'endDate')}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
  
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleFilter}
      >
        Filter Cars
      </button>
    </div>
    <Footer/>
    </div>
  );
  
  
};

export default CarFilter;
