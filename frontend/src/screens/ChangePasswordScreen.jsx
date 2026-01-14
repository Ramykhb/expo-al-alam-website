import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import api from "../../config/axios";

const ChangePasswordScreen = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [formData, setFormData] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: "",
    });

    const toggleVisibility = (field) => {
        setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async () => {
        if (!formData.oldPass || !formData.newPass || !formData.confirmPass) {
            alert("Please fill out all fields.");
            return;
        }
        if (formData.newPass !== formData.confirmPass) {
            alert("New password and confirmation do not match.");
            return;
        }

        try {
            const res = await api.put("/auth/update-password", {
                currentPass: formData.oldPass,
                newPass: formData.newPass,
            });
            alert("Password updated successfully.");
            navigate("/");
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <div className="w-full h-screen bg-[#080808] text-white flex flex-col">
            <NavBar />

            <main className="flex-1 flex items-center justify-center p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md bg-[#0c0c0c] border border-white/5 p-10 py-5 shadow-2xl relative z-10"
                >
                    <div className="mb-5 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10">
                            <ShieldCheck className="text-white/70" size={24} />
                        </div>
                        <h1
                            className="text-2xl font-black uppercase italic tracking-tighter"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Security Vault
                        </h1>
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.4em] mt-2">
                            Update Access Credentials
                        </p>
                    </div>

                    <form
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {[
                            {
                                id: "old",
                                label: "Current Password",
                                key: "oldPass",
                            },
                            {
                                id: "new",
                                label: "New Password",
                                key: "newPass",
                            },
                            {
                                id: "confirm",
                                label: "Confirm New Password",
                                key: "confirmPass",
                            },
                        ].map((field) => (
                            <div key={field.id} className="space-y-2">
                                <label className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-1">
                                    {field.label}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
                                        <Lock size={14} />
                                    </div>
                                    <input
                                        type={
                                            showPass[field.id]
                                                ? "text"
                                                : "password"
                                        }
                                        className="w-full bg-black/40 border border-white/5 py-3 pl-10 pr-10 text-xs font-medium tracking-widest focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-800"
                                        placeholder="••••••••"
                                        value={formData[field.key]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field.key]: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleVisibility(field.id)
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-600 hover:text-white transition-colors hover:cursor-pointer"
                                    >
                                        {showPass[field.id] ? (
                                            <EyeOff size={14} />
                                        ) : (
                                            <Eye size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="md:pt-4 space-y-4">
                            <button
                                className="w-full md:h-12 h-10 bg-white text-black font-bold uppercase text-[8px] md:text-[10px] tracking-[0.3em] flex items-center justify-center hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                onClick={handleSubmit}
                            >
                                Update Credentials
                            </button>
                        </div>
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

export default ChangePasswordScreen;
