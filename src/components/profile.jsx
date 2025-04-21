import { useState } from 'react';
import { Bell, Star, List, Settings, Heart, LogOut, ShoppingCart, UserRoundPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Wishlist from './whishlist';
import Cart from './cart';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  const [userData, setUserData] = useState({
    name: 'Sara',
    fullName: 'Tancredi',
    email: 'Sara.Tancredi@gmail.com',
    phone: '(+98) 9123728167',
    location: 'New York, USA',
    postalCode: '23728167'
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const logoutt = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      toast.success("LogGed Out")
      ;
      navigate("/login");
    }
  }

  const handleSave = () => {
  toast.success(" Saved Successfully ")

  };

  return (
    <div className=" min-h-screen">
      {/* Header */}


      {/* Content */}
      <div className="max-w mx-auto p-6 text-red-500">
        <h1 className="text-xl font-bold mb-6">User Profile</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 sm:w-20 space-y-1">
            <div className={`flex items-center p-3 cursor-pointer ${activeSection === 'profile'
              ? 'border-l-4 border-red-500 bg-red-200 text-red-500'
              : 'hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500'
              }`}
              onClick={() => setActiveSection('profile')}>
              <Bell size={18} className="mr-3" />
              <span className=''>User info</span>
            </div>

            <div className={`flex items-center p-3 cursor-pointer ${activeSection === 'wishlist'
                ? 'border-l-4 border-red-500 bg-red-200 text-red-500'
                : 'hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500'
              }`} onClick={() => setActiveSection('wishlist')}>
              <Heart size={18} className="mr-3 text-gray-400" />
              <span className="">Whishlist</span>
            </div>

            <div className={`flex items-center p-3 cursor-pointer ${activeSection === 'cart'
                ? 'border-l-4 border-red-500 bg-red-200 text-red-500'
                : 'hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500'
              }`}
              onClick={() => setActiveSection('cart')}>
              <ShoppingCart size={18} className="mr-3 text-gray-400" />
              <span className="">Cart</span>
            </div>
            <div className="flex items-center p-3 hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500 hover:bg-gray-50">
              <Settings size={18} className="mr-3 text-gray-400" />
              <span className="">Setting</span>
            </div>
            <div className="flex items-center p-3 hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500 hover:bg-gray-50">
              <Bell size={18} className="mr-3 text-gray-400" />
              <span className="">Notifications</span>
            </div>
            <div className="mt-8 flex items-center p-3 text-red-500 hover:bg-gray-50 flex items-center p-3 hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500 hover:bg-gray-50">
              <LogOut size={18} className="mr-3" />
              <button onClick={logoutt}>Logout</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 rounded-2xl shadow-lg min-h-screen p-4">

            {activeSection === 'profile' && (
              <>
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >{!isEditing&&(
                <div className="flex justify-end w-full ">
                  <button
                    onClick={() => setIsEditing(!isEditing)}>
                    <UserRoundPen size={30} className="mr-3 text-red-800 hover:text-green-500 shadow " />
                  </button>
                </div>)}
                  

                  <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-red-200">
                        <img src="/api/placeholder/100/100" alt="Sara Tancredi" className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
                        <Settings size={16} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Sara Tancredi</h2>
                      <p className="text-gray-500">New York, USA</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. New York, USA"
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={userData.postalCode}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md transition-shadow duration-300
                          ${isEditing ? 'shadow-md ring-1 ring-red-300 focus:shadow-red-500/50 focus:ring-2 focus:ring-red-400' : 'bg-gray-100 cursor-not-allowed'}
                        `}
                                              />
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={()=>{
                          handleSave()
                          setIsEditing(false)
                        }
                        }
                        
                        className="bg-red-500 hover:bg-red-800 text-white py-2 px-6 rounded-full"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
            {activeSection === 'wishlist' && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Wishlist />
              </motion.div>

            )}
            {activeSection === 'cart' && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Cart />
              </motion.div>


            )

            }
          </div>

        </div>
      </div>
    </div>
  );
}