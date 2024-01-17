import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MotorcycleFilter = () => {
  const navigate = useNavigate();
  const [motorcycleBrands, setMotorcycleBrands] = useState([]);
  const [motorcycleModels, setMotorcycleModels] = useState([]);
  const [motorcycleConditions, setMotorcycleConditions] = useState([]);
  const [motorcycleColors, setMotorcycleColors] = useState([]);
  const [motorcycleFuelTypes, setMotorcycleFuelTypes] = useState([]);
  const [motorcycleMileages, setMotorcycleMileages] = useState([]);
  const [motorcycleTransmissions, setMotorcycleTransmissions] = useState([]);
  const [motorcycleTypes, setMotorcycleTypes] = useState([]);
  const [motorcycleYears, setMotorcycleYears] = useState([]);
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);

  const [filter, setFilter] = useState({
    brandId: '',
    modelId: '',
    conditionId: '',
    colorId: '',
    fuelTypeId: '',
    mileageId: '',
    transmissionTypeId: '',
    typeId: '',
    yearId: '',
    startDate: '',
    endDate: '',
  });

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
      const response = await axios.get('https://localhost:7136/api/ApiMotorcycle/filter', {
        params: filter,
      });
      console.log('API Response:', response.data);
      setFilteredMotorcycles(response.data);
      navigate('/filtered-motorcycles', { state: { filteredMotorcycles: response.data } });

    } catch (error) {
      console.error('Error filtering motorcycles:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="container mx-auto mt-8 flex-grow">
        <h1 className="text-3xl mb-4">Filter Motorcycles</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Motorcycle Brand Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Brand:</label>
            <select
              name="brandId"
              value={filter.brandId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Brand</option>
              {motorcycleBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Model Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Model:</label>
            <select
              name="modelId"
              value={filter.modelId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Model</option>
              {motorcycleModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Condition Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Condition:</label>
            <select
              name="conditionId"
              value={filter.conditionId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Condition</option>
              {motorcycleConditions.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.condition}
                </option>
              ))}
            </select>
          </div>


          {/* Motorcycle Color Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Color:</label>
            <select
              name="colorId"
              value={filter.colorId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Color</option>
              {motorcycleColors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.color}
                </option>
              ))}
            </select>
          </div>


          {/* Motorcycle Fuel Type Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Fuel Type:</label>
            <select
              name="fuelTypeId"
              value={filter.fuelTypeId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Fuel Type</option>
              {motorcycleFuelTypes.map((fuelType) => (
                <option key={fuelType.id} value={fuelType.id}>
                  {fuelType.fuel}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Mileage Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Mileage:</label>
            <select
              name="mileageId"
              value={filter.mileageId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Mileage</option>
              {motorcycleMileages.map((mileage) => (
                <option key={mileage.id} value={mileage.id}>
                  {mileage.mileage}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Transmission Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Transmission:</label>
            <select
              name="transmissionTypeId"
              value={filter.transmissionTypeId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Transmission</option>
              {motorcycleTransmissions.map((transmission) => (
                <option key={transmission.id} value={transmission.id}>
                  {transmission.transmission}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Type Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Type:</label>
            <select
              name="typeId"
              value={filter.typeId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Type</option>
              {motorcycleTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Year Dropdown */}
          <div>
            <label className="text-sm">Motorcycle Year:</label>
            <select
              name="yearId"
              value={filter.yearId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Year</option>
              {motorcycleYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.yearOfProduction}
                </option>
              ))}
            </select>
          </div>

          {/* Motorcycle Start Date Input */}
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

          {/* Motorcycle End Date Input */}
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
          Filter Motorcycles
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default MotorcycleFilter;
