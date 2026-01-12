import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import {
    ChevronLeft,
    ChevronRight,
    Gauge,
    Box,
    Calendar,
    Zap,
    Palette, // Icon for colors
    Droplets, // Icon for interior
} from "lucide-react";
import { useNavigate } from "react-router";

const SingleVehicleScreen = () => {
    const [activeImg, setActiveImg] = useState(0);
    const navigate = useNavigate();

    const car = {
        name: "Phantom Stealth V12",
        price: "$2,450,000",
        stock: "STOCK: EX-0092",
        series: "APEX SERIES // 01",
        specs: [
            { label: "Mileage", value: "42 KM", icon: <Gauge size={14} /> },
            {
                label: "Transmission",
                value: "8-Speed DCT",
                icon: <Box size={14} />,
            },
            { label: "Power", value: "1,200 HP", icon: <Zap size={14} /> },
            { label: "Year", value: "2026", icon: <Calendar size={14} /> },
            {
                label: "Exterior",
                value: "Satin Black",
                icon: <Palette size={14} />,
            },
            {
                label: "Interior",
                value: "Alcantara Red",
                icon: <Droplets size={14} />,
            },
        ],
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200",
        ],
    };

    return (
        <div className="w-full h-screen bg-[#080808] text-white overflow-hidden flex flex-col">
            <NavBar />

            <main className="h-[75vh] flex flex-col md:flex-row min-h-0 bg-[#080808] overflow-hidden">
                <section className="flex-[1.6] flex flex-col p-6 pb-2 gap-3 min-h-0 overflow-hidden">
                    <nav className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 font-sans px-2">
                        <span
                            className="hover:text-white cursor-pointer transition-colors"
                            onClick={() => navigate("/collection")}
                        >
                            Vault
                        </span>
                        <ChevronRight size={10} />
                        <span className="text-white">{car.name}</span>
                    </nav>

                    <div className="flex-1 relative bg-zinc-900 rounded-sm overflow-hidden group border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImg}
                                src={car.images[activeImg]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                                onClick={() =>
                                    setActiveImg((prev) =>
                                        prev > 0
                                            ? prev - 1
                                            : car.images.length - 1
                                    )
                                }
                                className="p-4 bg-black/80 border border-white/10 hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() =>
                                    setActiveImg((prev) =>
                                        prev < car.images.length - 1
                                            ? prev + 1
                                            : 0
                                    )
                                }
                                className="p-4 bg-black/80 border border-white/10 hover:bg-white hover:text-black transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] font-bold tracking-widest border border-white/10">
                            {activeImg + 1} / {car.images.length}
                        </div>
                    </div>

                    <div className="flex gap-3 h-16 shrink-0 mb-2">
                        {car.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`flex-1 h-full border transition-all duration-300 relative ${
                                    activeImg === i
                                        ? "border-[#1e293b]"
                                        : "border-white/5 opacity-40 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={img}
                                    className="w-full h-full object-cover grayscale"
                                    alt="car"
                                />
                            </button>
                        ))}
                    </div>
                </section>

                <section className="flex-1 flex flex-col shadow-2xl overflow-hidden h-full">
                    <div className="px-8 pt-14 pb-4">
                        {" "}
                        <p className="text-[#64748b] text-[9px] font-bold tracking-[0.4em] mb-1">
                            {car.series}
                        </p>
                        <h1
                            className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-4"
                            style={{ fontFamily: "Oswald" }}
                        >
                            {car.name}
                        </h1>
                        <div className="flex justify-between items-center bg-white/5 p-3 border border-white/5">
                            <span className="text-xl font-light tracking-tight">
                                {car.price}
                            </span>
                            <span className="text-[9px] font-bold text-zinc-500 tracking-widest">
                                {car.stock}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 px-8 flex flex-col justify-center gap-2 overflow-hidden">
                        <div className="grid grid-cols-2 gap-2">
                            {" "}
                            {car.specs.map((s, i) => (
                                <div
                                    key={i}
                                    className="border border-white/5 p-2 py-3 flex flex-col gap-1 hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        {s.icon}
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
                                            {s.label}
                                        </span>
                                    </div>
                                    <span className="text-sm font-bold uppercase italic font-sans">
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-[#0c0c0c] shrink-0">
                        <button className="w-full h-12 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Acquire Unit
                        </button>
                    </div>
                </section>
            </main>

            <div className="w-full bg-white h-[10vh] flex items-center px-20 justify-between shrink-0">
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
    );
};

export default SingleVehicleScreen;
