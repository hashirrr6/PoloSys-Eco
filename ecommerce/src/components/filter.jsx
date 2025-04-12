// Filter.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Filter = ({ isOpen, onClose, onApply, initialFilters }) => {
  const categories = ["Food", "Accessories", "Fruits", "Watch", "Perfumes"];
  const [selectedCategories, setSelectedCategories] = useState(initialFilters?.selectedCategories || []);
  const [priceRange, setPriceRange] = useState(initialFilters?.maxPrice || 500);
  const [offersOnly, setOffersOnly] = useState(initialFilters?.offersOnly || false);

  const handleApply = () => {
    onApply({
      selectedCategories,
      maxPrice: priceRange,
      offersOnly,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange(500);
    setOffersOnly(false);
    onApply({
      selectedCategories: [],
      maxPrice: 500,
      offersOnly: false,
    });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={
        isOpen
          ? { height: "auto", opacity: 1 }
          : { height: 0, opacity: 0, overflow: "hidden" }
      }
      transition={{ duration: 0.4 }}
      className="w-full  text-gray-800 px-6 py-4 rounded-lg shadow-2xl z-30 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <h2 className="font-semibold mb-2">Category</h2>
          {categories.map((cat) => (
            <div key={cat} className="mb-1">
              <input
                type="checkbox"
                id={cat}
                className="mr-2 accent-red-600"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>

        {/* Price Range Slider */}
        <div>
          <h2 className="font-semibold mb-2">Max Price: ${priceRange}</h2>
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>

        {/* Offers Only */}
        <div>
          <h2 className="font-semibold mb-2">Offers Only</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2 accent-red-600"
              checked={offersOnly}
              onChange={() => setOffersOnly(!offersOnly)}
            />
            Show only items with offers
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 items-end justify-end">
          <button
            onClick={handleApply}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            className="border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;