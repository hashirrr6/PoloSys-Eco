import React from "react";

const Footer = () => {
  return (
    <>
      <hr className="border-t-2 border-red-700" />
      <div className="text-red-500 py-4">
      <footer className=" bottom-0 left-0 w-full  text-red py-4 h-32">
      <div className="container mx-auto px-4 flex flex-col items-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
  {/* Top Row - Three Sections */}
  <div className="w-full flex flex-row justify-between gap-4 mb-4 py-2">
    {/* Services Section */}
    <div className="w-1/3 text-center">
      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 md:mb-3">Services</h3>
      <ul className="space-y-1 text-xs sm:text-sm">
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Web design</a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Development</a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Hosting</a></li>
      </ul>
    </div>

    {/* About Section */}
    <div className="w-1/3 text-center">
      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 md:mb-3">About</h3>
      <ul className="space-y-1 text-xs sm:text-sm">
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Company</a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Team</a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Legacy</a></li>
      </ul>
    </div>

    {/* Careers Section */}
    <div className="w-1/3 text-center">
      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 md:mb-3">Careers</h3>
      <ul className="space-y-1 text-xs sm:text-sm">
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Job openings</a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Employee </a></li>
        <li><a href="#" className="transition duration-300 opacity-80 hover:opacity-100 hover:underline">Benefits</a></li>
      </ul>
    </div>
  </div>

  {/* Bottom Row - Social Icons */}
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
      </div>
    </>
  );
};

export default Footer;
