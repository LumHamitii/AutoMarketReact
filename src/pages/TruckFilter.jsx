import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const TruckFilter = () => {
  const navigate = useNavigate();
  const [truckBrands, setTruckBrands] = useState([]);
  const [truckModels, setTruckModels] = useState([]);
  const [truckConditions, setTruckConditions] = useState([]);
  const [truckColors, setTruckColors] = useState([]);
  const [truckFuelTypes, setTruckFuelTypes] = useState([]);
  const [truckMileages, setTruckMileages] = useState([]);
  const [truckTransmissions, setTruckTransmissions] = useState([]);
  const [truckVersions, setTruckVersions] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]);

  const [filter, setFilter] = useState({
    brandId: '',
    modelId: '',
    conditionId: '',
    colorId: '',
    fuelTypeId: '',
    mileageId: '',
    transmissionTypeId: '',
    versionId: '',
    startDate: '',
    endDate: '',
  });
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
      const response = await axios.get('https://localhost:7136/api/ApiTruck/filter', {
        params: filter,
      });
      console.log('API Response:', response.data);
      setFilteredTrucks(response.data);
      navigate('/filtered-trucks', { state: { filteredTrucks: response.data } });

    } catch (error) {
      console.error('Error filtering trucks:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="container mx-auto mt-8 flex-grow">
        <h1 className="text-3xl mb-4">Filter Trucks</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Truck Brand Dropdown */}
          <div>
            <label className="text-sm">Truck Brand:</label>
            <select
              name="brandId"
              value={filter.brandId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Brand</option>
              {truckBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Truck Model Dropdown */}
          <div>
            <label className="text-sm">Truck Model:</label>
            <select
              name="modelId"
              value={filter.modelId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Model</option>
              {truckModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>

          {/* Truck Condition Dropdown */}
          <div>
            <label className="text-sm">Truck Condition:</label>
            <select
              name="conditionId"
              value={filter.conditionId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Condition</option>
              {truckConditions.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.condition}
                </option>
              ))}
            </select>
          </div>


          {/* Truck Color Dropdown */}
          <div>
            <label className="text-sm">Truck Color:</label>
            <select
              name="colorId"
              value={filter.colorId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Color</option>
              {truckColors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.color}
                </option>
              ))}
            </select>
          </div>


          {/* Truck Fuel Type Dropdown */}
          <div>
            <label className="text-sm">Truck Fuel Type:</label>
            <select
              name="fuelTypeId"
              value={filter.fuelTypeId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Fuel Type</option>
              {truckFuelTypes.map((fuelType) => (
                <option key={fuelType.id} value={fuelType.id}>
                  {fuelType.fuelType}
                </option>
              ))}
            </select>
          </div>

          {/* Truck Mileage Dropdown */}
          <div>
            <label className="text-sm">Truck Mileage:</label>
            <select
              name="mileageId"
              value={filter.mileageId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
              <option value={0}>Select Mileage</option>
              {truckMileages.map((mileage) => (
                <option key={mileage.id} value={mileage.id}>
                  {mileage.mileage}
                </option>
              ))}
            </select>
          </div>

          {/* Truck Transmission Dropdown */}
        <div>
          <label className="text-sm">Truck Transmission:</label>
          <select
            name="transmissionTypeId"
            value={filter.transmissionTypeId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Transmission</option>
            {truckTransmissions.map((transmissionType) => (
              <option key={transmissionType.id} value={transmissionType.id}>
                {transmissionType.transmissionType}
              </option>
            ))}
          </select>
        </div>

        {/* Truck Version Dropdown */}
        <div>
          <label className="text-sm">Truck Version:</label>
          <select
            name="versionId"
            value={filter.versionId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={0}>Select Version</option>
            {truckVersions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.versionType}
              </option>
            ))}
          </select>
        </div>

          {/* Truck Start Date Input */}
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

          {/* Truck End Date Input */}
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
          Filter Trucks
        </button> <br />
        <button onClick={() => navigate('/all-trucks')} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Show All Listings</button>
      </div>
     
      <Footer />
    </div>
  )
}

export default TruckFilter