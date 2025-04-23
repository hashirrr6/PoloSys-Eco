import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Profile from "../assets/prof.webp";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ChevronRight, Settings, User, MapPin, CreditCard, Truck, History,
  RefreshCcw, Lock, ShieldCheck, Bell, Tag, HelpCircle, Mail, LogOut, Moon, Sun
} from 'lucide-react';

export default function SettingsPage() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [shippingNotifications, setShippingNotifications] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logoutt = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      toast.success("Logged Out");
      navigate("/login");
    }
  };

  const accountItems = [
    { label: 'Edit Profile', icon: <User size={18} className="text-red-700" /> },
    { label: 'Manage Addresses', icon: <MapPin size={18} className="text-red-700" /> },
    { label: 'Payment Methods', icon: <CreditCard size={18} className="text-red-700" /> },
  ];

  const orderItems = [
    { label: 'Track Orders', icon: <Truck size={18} className="text-red-700" /> },
    { label: 'Order History', icon: <History size={18} className="text-red-700" /> },
    { label: 'Return & Refund Policy', icon: <RefreshCcw size={18} className="text-red-700" /> },
  ];

  const securityItems = [
    { label: 'Change Password', icon: <Lock size={18} className="text-red-700" /> },
    { label: '2FA Settings', icon: <ShieldCheck size={18} className="text-red-700" /> },
  ];

  const supportItems = [
    { label: 'Help Center', icon: <HelpCircle size={18} className="text-red-700" /> },
    { label: 'Contact Support', icon: <Mail size={18} className="text-red-700" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col min-h-screen max-w-md mx-auto px-4 py-6 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
      }`}
    >
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings className={darkMode ? 'text-red-400' : 'text-red-600'} size={24} />
          <span className="font-semibold text-xl">Settings</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-yellow-100 overflow-hidden border-2 border-white shadow relative">
          <img src={Profile} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
        </div>
      </motion.div>

      {/* Account Section */}
      <SettingsGroup title="Account" items={accountItems} darkMode={darkMode} />

      {/* Order Preferences */}
      <SettingsGroup title="Orders" items={orderItems} darkMode={darkMode} />

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <h2 className={`font-semibold text-xs uppercase mb-3 tracking-wider flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Bell size={16} /> Notifications
        </h2>
        <div className="space-y-2">
          <NotificationToggle label="Order Updates" enabled={orderUpdates} onToggle={() => setOrderUpdates(!orderUpdates)} icon={<Truck size={16} className="text-red-600" />} darkMode={darkMode} />
          <NotificationToggle label="Shipping Notifications" enabled={shippingNotifications} onToggle={() => setShippingNotifications(!shippingNotifications)} icon={<Bell size={16} className="text-red-600" />} darkMode={darkMode} />
          <NotificationToggle label="Offers & Promotions" enabled={promoNotifications} onToggle={() => setPromoNotifications(!promoNotifications)} icon={<Tag size={16} className="text-red-600" />} darkMode={darkMode} />
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
        <h2 className={`font-semibold text-xs uppercase mb-3 tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Appearance</h2>
        <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} rounded-xl transition cursor-pointer`} onClick={toggleDarkMode}>
          <div className="flex items-center gap-3">
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-red-500" />}
            <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>Dark Mode</span>
          </div>
          <Toggle enabled={darkMode} onChange={toggleDarkMode} />
        </div>
      </motion.div>

      {/* Security */}
      <SettingsGroup title="Security" items={securityItems} darkMode={darkMode} />

      {/* Support */}
      <SettingsGroup title="Support" items={supportItems} darkMode={darkMode} />

      {/* Logout */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center gap-3 p-3 text-red-500 rounded-xl transition cursor-pointer hover:bg-red-100 dark:hover:bg-red-800 mb-4" onClick={logoutt}>
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SettingsGroup({ title, items, darkMode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
      <h2 className={`font-semibold text-xs uppercase mb-3 tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h2>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between p-3 rounded-xl transition cursor-pointer shadow-sm ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function NotificationToggle({ label, enabled, onToggle, icon, darkMode }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex items-center justify-between p-3 rounded-xl transition cursor-pointer shadow-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`} onClick={onToggle}>
      <div className="flex items-center gap-3">
        {icon}
        <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{label}</span>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} />
    </motion.div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <motion.button
      type="button"
      onClick={onChange}
      whileTap={{ scale: 0.9 }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
        enabled ? 'bg-red-400' : 'bg-gray-300'
      }`}
    >
      <motion.span
        layout
        className="inline-block h-4 w-4 bg-white rounded-full shadow-md"
        initial={false}
        animate={{ x: enabled ? 22 : 4 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </motion.button>
  );
}
