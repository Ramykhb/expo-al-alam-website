import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { Lock, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Authenticating...");
    };

    return (
        <div className="w-full h-screen bg-[#080808] text-white overflow-hidden flex flex-col">
            <NavBar />

            <main className="h-[75vh] flex items-center justify-center bg-[#080808] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <h1
                        className="text-[30vw] font-black italic uppercase tracking-tighter"
                        style={{ fontFamily: "Oswald" }}
                    >
                        ALAM
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md px-8 z-10 mb-20"
                >
                    <div className="text-center mb-10">
                        <p className="text-[#64748b] text-[10px] font-bold tracking-[0.5em] uppercase mb-2">
                            Secure Access
                        </p>
                        <h2
                            className="text-5xl font-black italic uppercase tracking-tighter"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Vault Login
                        </h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                Identity
                            </label>
                            <div className="relative group">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors"
                                    size={16}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="EMAIL ADDRESS"
                                    className="w-full h-14 bg-white/5 border border-white/10 px-12 text-xs font-bold tracking-widest placeholder:text-zinc-700 focus:outline-none focus:border-white/40 transition-all uppercase"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                Access Key
                            </label>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors"
                                    size={16}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full h-14 bg-white/5 border border-white/10 px-12 text-xs font-bold tracking-widest placeholder:text-zinc-700 focus:outline-none focus:border-white/40 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            initial="initial"
                            whileHover="hover"
                            whileTap="pressed"
                            className="w-full h-14 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-between px-8 transition-colors relative overflow-hidden mt-8 hover:cursor-pointer"
                        >
                            <motion.div
                                variants={{
                                    initial: { x: "-100%" },
                                    hover: { x: "0%" },
                                }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="absolute inset-0 bg-zinc-200 z-0"
                            />

                            <span className="relative z-10">Authenticate</span>

                            <motion.div
                                className="relative z-10"
                                variants={{
                                    initial: { x: 0 },
                                    hover: { x: 5 },
                                }}
                                transition={{ duration: 0.3, ease: "backOut" }}
                            >
                                <ChevronRight size={18} />
                            </motion.div>

                            <motion.div
                                variants={{
                                    initial: { opacity: 0 },
                                    hover: { opacity: 1 },
                                }}
                                className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] pointer-events-none"
                            />
                        </motion.button>
                    </form>
                </motion.div>
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
    );
};

export default LoginScreen;
