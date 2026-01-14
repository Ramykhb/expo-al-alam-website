import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import {
    Send,
    MapPin,
    Phone,
    Mail,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import axios from "axios";
import api from "../../config/axios";

const ContactUsScreen = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState({ type: null, message: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (status.type) setStatus({ type: null, message: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            setStatus({ type: "error", message: "All fields are required." });
            return;
        }

        setStatus({ type: "loading", message: "Transmitting manifest..." });

        try {
            const res = await api.post("/contact", formState);
            const response = res.data;
            if (response.success) {
                setStatus({
                    type: "success",
                    message: "Message transmitted successfully.",
                });
                setFormState({ name: "", email: "", message: "" });
            } else {
                setStatus({
                    type: "error",
                    message:
                        response.error ||
                        "Transmission failed. Please try again later.",
                });
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setStatus({
                type: "error",
                message: "An error occurred. Please try again later.",
            });
        }
    };

    return (
        <div className="w-screen min-h-screen md:h-screen relative md:overflow-hidden bg-[#080808] flex flex-col">
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 120%, rgba(45, 55, 75, 0.4) 0%, rgba(8, 8, 8, 1) 80%)",
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <NavBar />

                <main className="flex-1 px-6 md:px-20 grid lg:grid-cols-2 gap-10 lg:items-center py-10 md:py-0">
                    <div className="flex flex-col justify-center space-y-12 md:mb-14">
                        <section style={{ fontFamily: "Oswald" }}>
                            <motion.h1
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="text-white text-6xl md:text-8xl font-black uppercase italic tracking-tight leading-[0.9]"
                            >
                                Get In{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-t from-[#64748b] via-white to-[#1e293b] pr-4">
                                    Touch
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-zinc-500 tracking-[0.4em] uppercase text-[10px] mt-6 font-sans font-bold"
                            >
                                Send Us a Message // Your Inquiry Matters
                            </motion.p>
                        </section>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                            className="space-y-6"
                        >
                            {[
                                {
                                    icon: <MapPin size={20} />,
                                    title: "Location",
                                    detail: "Beirut, Hadath",
                                },
                                {
                                    icon: <Phone size={20} />,
                                    title: "Phone",
                                    detail: "+961 81 039 626",
                                },
                                {
                                    icon: <Mail size={20} />,
                                    title: "Email",
                                    detail: "alalamexpo@gmail.com",
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    className="flex gap-5 group items-center"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center border border-zinc-800 bg-white/5 text-[#64748b] group-hover:border-[#1e293b] group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4
                                            className="text-white text-xs font-bold uppercase italic tracking-wider font-sans"
                                            style={{ fontFamily: "Oswald" }}
                                        >
                                            {item.title}
                                        </h4>
                                        <p className="text-zinc-500 font-sans text-[11px] tracking-wide uppercase">
                                            {item.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex lg:justify-end items-center h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full max-w-lg bg-white/5 border border-white/10 p-6 md:p-10 backdrop-blur-xl relative shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-1 h-16 bg-[#1e293b]" />
                            <div className="absolute top-0 right-0 h-1 w-16 bg-[#1e293b]" />

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 font-sans"
                            >
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500"
                                        placeholder="JOHN DOE"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500"
                                        placeholder="JD@GMAIL.COM"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Inquiry
                                    </label>
                                    <textarea
                                        rows="3"
                                        name="message"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500 resize-none"
                                        placeholder="MESSAGE..."
                                        value={formState.message}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <AnimatePresence mode="wait">
                                    {status.type && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-1 ${
                                                status.type === "success"
                                                    ? "text-emerald-500"
                                                    : status.type === "loading"
                                                    ? "text-zinc-400"
                                                    : "text-rose-500"
                                            }`}
                                        >
                                            {status.type === "success" && (
                                                <CheckCircle2 size={14} />
                                            )}
                                            {status.type === "error" && (
                                                <AlertCircle size={14} />
                                            )}
                                            {status.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={status.type === "loading"}
                                    className={`relative overflow-hidden group w-full h-14 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 group-hover:cursor-pointer hover:cursor-pointer hover:shadow-[0_0_30px_5px_rgba(45,55,75,0.8)] mt-4 ${
                                        status.type === "loading"
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <span className="absolute inset-0 bg-[#1e293b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
                                    <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-3 transition-colors duration-500 font-sans">
                                        {status.type === "loading"
                                            ? "Processing..."
                                            : "Submit Inquiry"}{" "}
                                        <Send size={14} />
                                    </span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </main>

                <div className="w-full bg-white md:h-[10vh] py-6 md:py-0 flex flex-col md:flex-row items-center px-10 md:px-20 justify-between gap-4 md:gap-0">
                    <span className="text-black text-[10px] tracking-[0.3em] uppercase font-bold font-sans">
                        © Expo Al Alam
                    </span>

                    <div className="h-px flex-1 mx-10 bg-black/10 hidden md:block" />

                    <div className="flex items-center gap-8">
                        <a
                            href="https://instagram.com/expoalam"
                            target="_blank"
                            className="block transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src="/instagram-icon.svg"
                                alt="Instagram"
                                className="w-6 h-6 object-contain"
                            />
                        </a>
                        <a
                            href="https://tiktok.com/@alalamcars"
                            target="_blank"
                            className="block transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src="/tiktok-icon.svg"
                                alt="TikTok"
                                className="w-5 h-5 object-contain"
                            />
                        </a>
                        <a
                            href="https://wa.me/96181039626"
                            target="_blank"
                            className="block transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src="/whatsapp-icon.svg"
                                alt="WhatsApp"
                                className="w-5 h-5 object-contain"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsScreen;
