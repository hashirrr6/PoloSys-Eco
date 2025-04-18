import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <motion.h1 
        className="text-2xl md:text-4xl font-bold text-red-800 text-center mb-4 md:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Polosys
      </motion.h1>

      <motion.p 
        className="text-base md:text-lg text-red-600 text-center mb-8 md:mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Where Quality Meets Convenience
      </motion.p>

      <motion.div 
        className=" shadow-md rounded-lg p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-red-800 mb-3">Who We Are</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Polosys is a premium eCommerce platform dedicated to bringing high-quality products right to your doorstep. 
          Our mission is to make online shopping seamless, reliable, and enjoyable. From stylish accessories to 
          cutting-edge gadgets, we carefully curate our collection to ensure top-notch quality and unbeatable prices.
        </p>
      </motion.div>

      <motion.div 
        className="bg-gray-100 shadow-md rounded-lg p-4 md:p-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-red-800 mb-3">Our Commitment</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          At Polosys, customer satisfaction is at the heart of everything we do. We strive to provide:
        </p>
        <ul className="list-disc pl-4 md:pl-6 mt-2 md:mt-3 text-sm md:text-base text-gray-700">
          <li>High-quality, trendy products</li>
          <li>Fast and secure shipping</li>
          <li>Exceptional customer support</li>
          <li>Hassle-free returns and exchanges</li>
        </ul>
      </motion.div>

      <motion.div 
        className=" shadow-md rounded-lg p-4 md:p-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-red-800 mb-3">Why Shop With Us?</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Unlike other online stores, we prioritize <strong>quality over quantity</strong>. Every product listed on Polosys is 
          carefully reviewed to ensure it meets our high standards. With secure payments, excellent customer service, 
          and fast shipping, we offer an unparalleled shopping experience.
        </p>
      </motion.div>

      <motion.div 
        className="bg-gray-100 shadow-md rounded-lg p-4 md:p-6 mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-red-800 mb-3">Join the Polosys Family</h2>
        <p className="text-sm md:text-base text-gray-600">
          Whether you're looking for the latest fashion trends, stylish accessories, or innovative gadgets, 
          Polosys has you covered. Explore our collection and experience the future of online shopping today!
        </p>
      </motion.div>
    </div>
  );
};

export default About;
