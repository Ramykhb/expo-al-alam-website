import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../config/axios.js";
import { refreshToken } from "../../../backend/controllers/authController.js";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [navItems, setNavItems] = useState([
        { name: "COLLECTION", path: "/collection" },
        { name: "ABOUT US", path: "/about-us" },
        { name: "CONTACT US", path: "/contact-us" },
        { name: "LOGIN", path: "/login" },
    ]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await api.get("/auth/status", { refreshToken });
            if (res.data.loggedIn) {
                setNavItems([
                    { name: "COLLECTION", path: "/collection" },
                    { name: "ADD VEHICLE", path: "/add-vehicle" },
                    { name: "CHANGE PASSWORD", path: "/change-password" },
                    { name: "LOGOUT", path: "/" },
                ]);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <nav className="relative z-[100]">
            <div
                className="w-full h-[15vh] px-6 md:px-10 lg:px-20 flex items-center justify-between"
                style={{ fontFamily: "Bebas Neue" }}
            >
                <Link to={"/"} className="w-20 md:w-24 lg:w-32 transition-all">
                    <img src="/logo.png" alt="Logo" className="w-full h-auto" />
                </Link>

                <ul className="hidden lg:flex flex-row items-center gap-8 xl:gap-16 text-white lg:text-xl xl:text-2xl">
                    {navItems.map((item) => (
                        <li key={item.name} className="relative group py-2">
                            {item.name === "LOGOUT" ? (
                                <button
                                    onClick={async () => {
                                        localStorage.removeItem("accessToken");
                                        await api.post("/auth/logout", {
                                            refreshToken:
                                                localStorage.getItem(
                                                    "refreshToken"
                                                ),
                                        });
                                        localStorage.removeItem("refreshToken");
                                        window.location.href = "/";
                                    }}
                                    className="text-white tracking-widest hover:cursor-pointer"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="text-white tracking-widest"
                                >
                                    {item.name}
                                </Link>
                            )}
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>

                <button
                    className="lg:hidden text-white p-2 z-[110]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md lg:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="fixed top-0 right-0 h-full w-[70%] bg-[#0c0c0c] border-l border-white/5 z-[105] flex flex-col p-10 lg:hidden shadow-2xl"
                            style={{ fontFamily: "Bebas Neue" }}
                        >
                            <div className="mt-20 flex flex-col gap-6 text-white text-3xl">
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name === "LOGOUT" ? (
                                            <button
                                                onClick={async () => {
                                                    setIsOpen(false);
                                                    localStorage.removeItem(
                                                        "accessToken"
                                                    );
                                                    await api.post(
                                                        "/auth/logout",
                                                        {
                                                            refreshToken:
                                                                localStorage.getItem(
                                                                    "refreshToken"
                                                                ),
                                                        }
                                                    );
                                                    localStorage.removeItem(
                                                        "refreshToken"
                                                    );
                                                    window.location.href = "/";
                                                }}
                                                className="tracking-widest block py-2 border-b border-white/5 text-left"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsOpen(false)}
                                                className="tracking-widest block py-2 border-b border-white/5"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto opacity-20">
                                <p className="text-xs tracking-[0.5em] uppercase font-sans font-bold">
                                    © Expo Al Alam
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
