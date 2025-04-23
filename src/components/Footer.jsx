import React from "react";
import { FaHome, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <>
      {/* Desktop Footer */}
      <hr className="border-t-2 border-red-700 hidden md:block" />
      <footer className="bottom-0 left-0 w-full hidden md:block text-red py-4 h-32">
        <div className="container mx-auto px-4 flex flex-col items-center min-h-[220px]">
          <div className="w-full flex flex-row justify-between gap-4 mb-4 py-2">
            <div className="w-1/3 text-center">
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">Services</h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Web design</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Development</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Hosting</a></li>
              </ul>
            </div>

            <div className="w-1/3 text-center">
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">About</h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Company</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Team</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Legacy</a></li>
              </ul>
            </div>

            <div className="w-1/3 text-center">
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">Careers</h3>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Job openings</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Employee</a></li>
                <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">Benefits</a></li>
              </ul>
            </div>
          </div>

          <div className="w-full text-center mt-auto py-2">
            <div className="flex justify-center space-x-4 mb-2">
              {[
                { icon: "whatsapp", link: "https://web.whatsapp.com/" },
                { icon: "twitter", link: "#" },
                { icon: "snapchat", link: "#" },
                { icon: "instagram", link: "https://www.instagram.com/deft._in/?utm_source=ig_web_button_share_sheet" },
              ].map(({ icon, link }) => (
                <a
                  key={icon}
                  href={link}
                  className="text-lg sm:text-xl border border-gray-400 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition transform duration-300 hover:scale-110 hover:bg-red-700 hover:text-white"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
            <p className="text-xs sm:text-sm opacity-60">POLOSYS © 2024</p>
          </div>
        </div>
      </footer>

      <div className="md:hidden mt-5" />
      {/* Mobile Footer - Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-inner border-t border-gray-200">
        <div className="flex justify-between items-center px-6 py-2">
          <a
            href="/"
            className={`flex flex-col items-center text-xs ${
              isActive("/") ? "bg-red-200 text-red-800" : "text-red-600"
            } px-2 py-1 rounded`}
          >
            <FaHome className="text-lg" />
            Home
          </a>
          <a
            href="/wishlist"
            className={`flex flex-col items-center text-xs ${
              isActive("/wishlist") ? "bg-red-200 text-red-800" : "text-red-600"
            } px-2 py-1 rounded`}
          >
            <FaHeart className="text-lg" />
            Wishlist
          </a>
          <a
            href="/cart"
            className={`flex flex-col items-center text-xs ${
              isActive("/cart") ? "bg-red-200 text-red-800" : "text-red-600"
            } px-2 py-1 rounded`}
          >
            <FaShoppingCart className="text-lg" />
            Cart
          </a>
          <a
            href="/account"
            className={`flex flex-col items-center text-xs ${
              isActive("/account") ? "bg-red-200 text-red-800" : "text-red-600"
            } px-2 py-1 rounded`}
          >
            <FaUser className="text-lg" />
            Profile
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
