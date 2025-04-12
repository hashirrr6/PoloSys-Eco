import "../App.css";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cartSlice";

const Nav = () => {
    const cartAnimation = useAnimation();
    const itemCount = useSelector(selectCartItemCount);
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <>
          <div className="main flex justify-center px-4 md:px-8 w-full h-35">
          <div className="w-full flex justify-between items-center py-4">

                    {/* Logo */}
                    <motion.img
                        src={Logo}
                        alt="Logo"
                        className="w-20 h-20 md:w-50 md:h-15 filter invert sepia saturate-[4000%] hue-rotate-[-20deg] brightness-[0.6]"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    />

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex space-x-8 text-red-700 text-lg items-center">
                        {["Home", "About", "Contact"].map((item, index) => (
                            <motion.li
                                key={index}
                                className="relative px-2 py-1"
                                whileHover={{ scale: 1.2 }}
                            >
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-red-700 rounded-full opacity-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileHover={{ opacity: 0.2, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <Link to={`/${item.toLowerCase()}`} className="relative z-10">
                                    {item}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Right Icons */}
                    <ul className="flex space-x-8 text-red-700 text-xl items-center">
                        <motion.li
                            className="relative"
                            animate={{ scale: 1 }} // 👈 default state
                            whileHover={{ scale: 2 }} // 👈 hover state
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Link to="/cart" className="relative inline-block">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className={itemCount > 0 ? "text-red-600" : ""}
                                />
                                {itemCount > 0 && (
                                    <motion.span
                                        key={itemCount}
                                        className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs"
                                        initial={{ scale: 4 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500 }}
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.li>

                        <motion.li whileHover={{ scale: 1.7 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Link to="/wishlist"><FontAwesomeIcon icon={faHeart} /></Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.7 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Link to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
                        </motion.li>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-red-700 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 text-red-700 text-lg space-y-3">
                    {["Home", "About", "Contact"].map((item, index) => (
                        <Link
                            key={index}
                            to={`/${item.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            className="block"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}

            <div>
                <hr className="border-t-2 border-red-700" />
            </div>
        </>
    );
};

export default Nav;
