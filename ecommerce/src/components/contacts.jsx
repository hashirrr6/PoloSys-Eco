import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 py-6 text-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.h1 
        className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Contact Us
      </motion.h1>
      
      <motion.p 
        className="text-sm md:text-lg mb-4 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Have a question? Reach out to us! We’d love to hear from you.
      </motion.p>

      {/* Contact Information Box */}
      <motion.div 
        className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-3">Get in Touch</h2>
        <p className="text-sm md:text-base mb-2"><strong>Email:</strong> support@polosys.com</p>
        <p className="text-sm md:text-base mb-2"><strong>Phone:</strong> +91 98765 43210</p>
        <p className="text-sm md:text-base mb-2"><strong>Address:</strong> Kinfra, Kozhikode, Kerala, India</p>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-4 flex flex-col">
          <motion.input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 text-sm md:text-base border rounded-lg transition-all focus:ring-2 focus:ring-red-400 focus:border-red-400"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 text-sm md:text-base border rounded-lg transition-all focus:ring-2 focus:ring-red-400 focus:border-red-400"
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.textarea 
            placeholder="Your Message" 
            className="w-full p-3 text-sm md:text-base border rounded-lg transition-all focus:ring-2 focus:ring-red-400 focus:border-red-400" 
            rows="4"
            required
            whileFocus={{ scale: 1.05 }}
          ></motion.textarea>
          <motion.button 
            type="submit" 
            className="bg-red-500 text-white px-6 py-3 text-sm md:text-base rounded-lg hover:bg-red-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
