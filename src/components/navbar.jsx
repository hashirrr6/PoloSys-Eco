import "../App.css";
import Logo from "../assets/loggg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping,faHeart, faUser, faBars, faXmark,  } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cartSlice";

const Nav = () => {
    const cartAnimation = useAnimation();
    const itemCount = useSelector(selectCartItemCount);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (itemCount) {
            cartAnimation.start({
                scale: [1, 1.2, 1],
                opacity: 1,
                transition: {
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            });
        }
    }, [itemCount, cartAnimation]);

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
        <div>
            <div className="sticky top-0 bg-white z-50 shadow-md hidden md:block sm:block">
                <div className="main flex justify-center  md:px-8 w-full">
                    <div className="w-full max-w-7xl flex justify-between items-center py-2 md:py-4">
                        {/* Logo */}
                        <Link to="/">
                            <motion.img
                                src={Logo}
                                alt="Logo"
                                className="w-18 h-18 md:w-26 md:h-24 "
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            />
                        </Link>

                        {/* Desktop Nav Links */}
                        <ul className="hidden md:flex space-x-8 text-red-700 text-lg items-center">
                            {["Home", "About", "Contact"].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="relative px-2 py-1"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 w-full h-full bg-red-700 rounded-full opacity-0"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileHover={{ opacity: 0.1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <Link to={`/${item.toLowerCase()}`} className="relative z-10 font-medium">
                                        {item}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Right Icons */}
                        <div className="flex items-center space-x-6 md:space-x-8 text-red-700">
                            {/* Cart Icon - Always visible */}
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <Link to="/cart" className="relative inline-block text-xl">
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className={itemCount > 0 ? "text-red-600" : ""}
                                    />
                                    {itemCount > 0 && (
                                        <motion.span
                                            key={itemCount}
                                            className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                                            initial={{ scale: 1.5 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            {itemCount}
                                        </motion.span>
                                    )}
                                </Link>
                            </motion.div>

                            {/* Wishlist Icon - Always visible on both mobile and desktop */}
                            <motion.div 
                                whileHover={{ scale: 1.2 }} 
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex" // Changed from hidden md:flex to always flex
                            >
                                <Link to="/wishlist" className="text-xl text-red-600">
                                    <FontAwesomeIcon icon={faHeart} />
                                </Link>
                            </motion.div>

                            {/* Profile Icon - Hidden on mobile */}
                            <motion.div 
                                whileHover={{ scale: 1.2 }} 
                                transition={{ type: "spring", stiffness: 300 }}
                                className="hidden md:flex"
                            >
                                <Link to="/profile" className="text-xl text-red-600">
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </motion.div>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="md:hidden text-xl text-red-700 focus:outline-none p-1 text-red-600"
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle menu"
                            >
                                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu with Animation */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="md:hidden bg-white border-t border-red-100"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                        >
                            <div className="px-6 py-4 text-red-700 flex flex-col space-y-4">
                                {["Home", "About", "Contact"].map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/${item.toLowerCase()}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="block py-2 font-medium border-b border-red-100"
                                    >
                                        {item}
                                    </Link>
                                ))}
                                
                                {/* Keep profile in mobile menu */}
                                <Link
                                    to="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center py-2 font-medium"
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                                    <span>My Account</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div>
                    <hr className="border-t-2 border-red-700" />
                </div>
            </div>
            </div>
        </>
    );
};

export default Nav;