import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import { ArrowUpRight, Crosshair, Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../../config/axios";

const CollectionScreen = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");
    const navigate = useNavigate();

    const brands = [
        "ALL",
        "MERCEDES",
        "BMW",
        "AUDI",
        "NISSAN",
        "TOYOTA",
        "HONDA",
        "HYUNDAI",
        "FORD",
        "TESLA",
    ];

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await api.get("/vehicles");
                setCars(res.data.cars || []);
            } catch (error) {
                console.error("Vault connection error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            const matchesSearch =
                car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.series.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                activeFilter === "ALL" ||
                car.brand.toUpperCase() === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter, cars]);

    return (
        <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col">
            <style>
                {`
                    .filter-mask {
                        mask-image: linear-gradient(to right, black 80%, transparent 100%);
                        -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
                    }
                    @media (min-width: 768px) {
                        .filter-mask {
                            mask-image: none !important;
                            -webkit-mask-image: none !important;
                        }
                    }
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            <NavBar />

            <main className="flex-grow px-6 md:px-12 pt-14 pb-12 flex flex-col">
                <header className="mb-10 flex flex-wrap md:flex-row justify-between items-end border-b border-white/5 pb-6 gap-y-8 gap-x-4">
                    <div className="w-full lg:w-auto">
                        <h1
                            className="text-5xl font-black uppercase italic tracking-tighter"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Our{" "}
                            <span className="text-zinc-600">Collection</span>
                        </h1>

                        <div className="relative mt-10">
                            <div
                                className="filter-mask flex gap-6 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                                style={{
                                    msOverflowStyle: "none",
                                    scrollbarWidth: "none",
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                {brands.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f)}
                                        className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap snap-start ${
                                            activeFilter === f
                                                ? "text-white border-b border-white"
                                                : ""
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                                <div className="min-w-[40px] lg:hidden" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 w-full lg:w-auto border-t border-white/5 pt-4 md:border-none md:pt-0">
                        <div className="relative group w-full md:w-64">
                            <Search
                                size={14}
                                className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="SEARCH VAULT..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-b border-zinc-800 py-2 pl-6 text-[10px] font-bold tracking-[0.2em] text-white focus:outline-none focus:border-white transition-all placeholder:text-zinc-700"
                            />
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono whitespace-nowrap uppercase">
                            Results: {filteredCars.length} / {cars.length}
                        </span>
                    </div>
                </header>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-zinc-600">
                        <Loader2 className="animate-spin" size={32} />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                            Synchronizing Vault
                        </span>
                    </div>
                ) : filteredCars.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center w-full min-h-[40vh]">
                        <p className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">
                            No vehicles match your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[160px] gap-3">
                        <AnimatePresence mode="popLayout">
                            {filteredCars.map((car) => (
                                <motion.div
                                    layout
                                    key={car.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={() =>
                                        navigate(`/vehicle/${car.id}`)
                                    }
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="hover:cursor-pointer group relative overflow-hidden bg-zinc-900 border border-white/5 md:col-span-1 md:row-span-1"
                                >
                                    <div
                                        className="absolute inset-0 transition-all duration-700 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 opacity-30 group-hover:opacity-100"
                                        style={{
                                            backgroundImage: `url(${
                                                car.image_links
                                                    ? car.image_links[0]
                                                    : ""
                                            })`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    />
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between z-20 pointer-events-none">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[8px] tracking-widest text-zinc-500 font-bold uppercase bg-black/40 px-2 py-1 backdrop-blur-sm">
                                                {car.series}
                                            </span>
                                            <Crosshair
                                                size={12}
                                                className="opacity-20 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <h2
                                            className="text-sm md:text-base font-black italic uppercase leading-none tracking-tighter"
                                            style={{ fontFamily: "Oswald" }}
                                        >
                                            {car.name}
                                        </h2>
                                    </div>
                                    <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center cursor-pointer pointer-events-auto active:scale-90 transition-transform">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
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

export default CollectionScreen;
