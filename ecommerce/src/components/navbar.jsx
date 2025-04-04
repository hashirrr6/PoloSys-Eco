import "../App.css";
import Logo from "../assets/loggg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Nav = () => {
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const cartAnimation = useAnimation();

    // Listen for changes in localStorage
    useEffect(() => {
        // Initial check
        const checkCartItems = () => {
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            const itemCount = cartItems.length;
            
            setCartItemsCount(itemCount);
            
            // Trigger animation when cart is not empty
            if (itemCount > 0) {
                cartAnimation.start({
                    scale: [1, 1.2, 1],  // Scale up and back to original size
                    transition: {
                      duration: 0.9,
                      repeat: 3,  // Repeats 3 times
                      ease: "easeInOut"
                    }
                });
            }
        };

        checkCartItems();

        // Setup event listener for storage changes
        const handleStorageChange = (e) => {
            if (e.key === "cart") {
                checkCartItems();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Custom event for direct component updates
        const handleCustomEvent = () => checkCartItems();
        window.addEventListener('cartUpdated', handleCustomEvent);

        // Check periodically in case other methods update cart
        const interval = setInterval(checkCartItems, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartUpdated', handleCustomEvent);
            clearInterval(interval);
        };
    }, [cartAnimation]);

    return (
        <>
            <div className="main flex justify-center">
                <div className="container flex justify-between items-center h-20 m-6">
                    <ul className="left flex space-x-12 text-red-700 items-center text-xl">
                        <motion.li>
                            <motion.img
                                src={Logo}
                                alt="Logo"
                                className="w-32 h-32"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                            />
                        </motion.li>
                        {["Home", "About", "Contact"].map((item, index) => (
                            <motion.li
                                key={index}
                                className="relative px-4 py-2"
                                whileHover={{ scale: 1.3 }}
                            >
                                <motion.div
                                    className="absolute inset-0 w-12 h-12 bg-red-700 rounded-full opacity-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <Link to={`/${item.toLowerCase()}`} className="relative z-10">
                                    {item}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Right-side icons with navigation */}
                    <ul className="right flex space-x-12 text-red-700 text-xl">
                        <motion.li
                            whileHover={{ scale: 1.5, color: "#b91c1c" }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="relative"
                            animate={cartAnimation}
                        >
                            <Link to="/cart" className="relative inline-block">
                                <FontAwesomeIcon icon={faCartShopping} className={cartItemsCount > 0 ? "text-red-600" : ""} />
                                {cartItemsCount > 0 && (
                                    <motion.span 
                                        className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                    >
                                        {cartItemsCount}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.5, color: "#b91c1c" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link to="/wishlist">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                        </motion.li>
                        <motion.li
                            whileHover={{ scale: 1.5, color: "#b91c1c" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link to="/profile">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </motion.li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className="border-t-2 border-red-700" />
            </div>
        </>
    );
};

export default Nav;