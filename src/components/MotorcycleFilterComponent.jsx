// MotorcycleFilterComponent.js
import React from 'react';

const MotorcycleFilterComponent = ({ sortOrder, handleSortChange, minPrice, maxPrice, setMinPrice, setMaxPrice, handleFilter }) => {
  return (
    <div className="flex items-center space-x-4">
      <div>
        <label className="mr-2 text-base md:text-lg">Sort by Price:</label>
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border p-2 rounded text-sm md:text-base"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label className="mr-2 text-base md:text-lg">Filter by Price:</label>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded text-sm md:text-base"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded text-sm md:text-base"
          />
          <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded text-sm md:text-base">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleFilterComponent;
