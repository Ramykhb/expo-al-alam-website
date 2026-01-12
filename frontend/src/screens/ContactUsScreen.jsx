import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactUsScreen = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-[#080808] flex flex-col">
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 120%, rgba(45, 55, 75, 0.4) 0%, rgba(8, 8, 8, 1) 80%)",
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <NavBar />

                <main className="flex-1 px-20 grid lg:grid-cols-2 gap-10 items-center ">
                    <div className="flex flex-col justify-center space-y-12 mb-14">
                        <section style={{ fontFamily: "Oswald" }}>
                            <motion.h1
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="text-white text-7xl md:text-8xl font-black uppercase italic tracking-tight leading-[0.9]"
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

                    <div className="flex justify-end items-center h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full max-w-lg bg-white/5 border border-white/10 p-10 backdrop-blur-xl relative shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-1 h-16 bg-[#1e293b]" />
                            <div className="absolute top-0 right-0 h-1 w-16 bg-[#1e293b]" />

                            <form className="space-y-6 font-sans">
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500"
                                        placeholder="JOHN DOE"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500"
                                        placeholder="JD@GMAIL.COM"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                        Inquiry
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-transparent border-b border-zinc-800 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors duration-500 resize-none"
                                        placeholder="MESSAGE..."
                                    />
                                </div>

                                <button className="relative overflow-hidden group w-full h-14 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 group-hover:cursor-pointer hover:shadow-[0_0_30px_5px_rgba(45,55,75,0.8)] mt-4 hover:cursor-pointer">
                                    <span className="absolute inset-0 bg-[#1e293b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>
                                    <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-3 transition-colors duration-500 font-sans">
                                        Submit Inquiry <Send size={14} />
                                    </span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </main>

                <div className="w-full bg-white h-[10vh] flex items-center px-20 justify-between">
                    <span className="text-black text-[10px] tracking-[0.3em] uppercase font-bold font-sans">
                        © Expo Al Alam
                    </span>

                    <div className="h-px flex-1 mx-10 bg-black/10" />

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
