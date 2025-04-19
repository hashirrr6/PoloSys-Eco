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
      className="w-full text-gray-800 px-4 sm:px-6 py-4 rounded-lg shadow-2xl z-30 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Category Filter */}
        <div>
          <h2 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Category</h2>
          <div className="space-y-1">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  id={cat}
                  className="mr-2 accent-red-600 h-3 w-3 sm:h-4 sm:w-4"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                <label htmlFor={cat} className="text-xs sm:text-sm">{cat}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Slider */}
        <div>
          <h2 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Max Price: ${priceRange}</h2>
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-red-600 h-1.5 sm:h-2"
          />
        </div>

        {/* Offers Only */}
        <div>
          <h2 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Offers Only</h2>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2 accent-red-600 h-3 w-3 sm:h-4 sm:w-4"
              checked={offersOnly}
              onChange={() => setOffersOnly(!offersOnly)}
            />
            <span className="text-xs sm:text-sm">Show only items with offers</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 items-stretch sm:items-end justify-end">
          <button
            onClick={handleApply}
            className="bg-red-500 hover:bg-red-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm w-full sm:w-auto"
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            className="border border-red-500 text-red-500 hover:bg-red-50 py-1.5 sm:py-2 px-3 sm:px-4 rounded text-xs sm:text-sm w-full sm:w-auto"
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;