import "../App.css";
import Logo from "../assets/loggg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
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
                                whileHover={{ scale: 1.1 }}
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
                    <ul className="right flex space-x-12 text-red-700 text-xl">
                        {[faCartShopping, faHeart, faUser].map((icon, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.2, color: "#b91c1c" }} 
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <FontAwesomeIcon icon={icon} />
                            </motion.li>
                        ))}
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
