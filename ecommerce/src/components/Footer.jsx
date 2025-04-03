import React from "react";


const Footer = () => {
  return (
    <>
      <hr className="border-t-2 border-red-700" />
      <div className=" text-red-500 py-4">
        <footer className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {/* Services Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left">
              <h3 className="font-bold text-lg mb-3">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-100 opacity-80">Web design</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Development</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Hosting</a></li>
              </ul>
            </div>

            {/* About Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left">
              <h3 className="font-bold text-lg mb-3">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-100 opacity-80">Company</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Team</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Legacy</a></li>
              </ul>
            </div>

            {/* Careers Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left">
              <h3 className="font-bold text-lg mb-3">Careers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-100 opacity-80">Job openings</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Employee success</a></li>
                <li><a href="#" className="hover:opacity-100 opacity-80">Benefits</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="w-full md:w-1/4 text-center">
              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://web.whatsapp.com/" className="text-2xl border border-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="text-2xl border border-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-2xl border border-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90">
                  <i className="fab fa-snapchat"></i>
                </a>
                <a href="https://www.instagram.com/deft._in/?utm_source=ig_web_button_share_sheet" className="text-2xl border border-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p className="text-sm opacity-60 mt-4">POLOSYS © 2024</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
