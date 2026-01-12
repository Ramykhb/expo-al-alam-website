import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import { ArrowUpRight, Crosshair, Search } from "lucide-react";
import { useNavigate } from "react-router";

const getGridSize = (index) => {
    const pattern = index % 7;
    return "md:col-span-1 md:row-span-1";
};

const CollectionScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");
    const navigate = useNavigate();

    const cars = [
        {
            id: 1,
            name: "Phantom Stealth",
            series: "Apex 01",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
        },
        {
            id: 2,
            name: "M-Monza",
            series: "Heri 04",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800",
        },
        {
            id: 3,
            name: "C-Wraith",
            series: "Lim 09",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
        {
            id: 4,
            name: "Slate GT",
            series: "Proto 02",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
        {
            id: 5,
            name: "Nebula",
            series: "Conc 11",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
        },
        {
            id: 6,
            name: "Vortex",
            series: "Apex 02",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800",
        },
        {
            id: 7,
            name: "Slate R",
            series: "Track 05",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
        {
            id: 8,
            name: "Phantom Stealth",
            series: "Apex 01",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
        },
        {
            id: 9,
            name: "M-Monza",
            series: "Heri 04",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800",
        },
        {
            id: 10,
            name: "C-Wraith",
            series: "Lim 09",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
        {
            id: 11,
            name: "Slate GT",
            series: "Proto 02",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
        {
            id: 12,
            name: "Nebula",
            series: "Conc 11",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
        },
        {
            id: 13,
            name: "Vortex",
            series: "Apex 02",
            image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800",
        },
        {
            id: 14,
            name: "Slate R",
            series: "Track 05",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
        },
    ];

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            const matchesSearch =
                car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.series.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                activeFilter === "ALL" ||
                car.series.toUpperCase().includes(activeFilter);
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter]);

    return (
        <div className="w-full min-h-screen bg-[#080808] text-white">
            <NavBar />

            <main className="px-6 md:px-12 pt-14 pb-12">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6 gap-6">
                    <div className="w-full md:w-auto">
                        <h1
                            className="text-5xl font-black uppercase italic tracking-tighter"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Our{" "}
                            <span className="text-zinc-600">Collection</span>
                        </h1>
                        <div className="flex gap-4 mt-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            {["ALL", "APEX", "HERI", "LIM", "PROTO"].map(
                                (f) => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f)}
                                        className={`hover:text-white transition-colors cursor-pointer ${
                                            activeFilter === f
                                                ? "text-white border-b border-white"
                                                : ""
                                        }`}
                                    >
                                        {f}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full md:w-auto">
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
                        <span className="text-[10px] text-zinc-500 font-mono hidden md:block whitespace-nowrap">
                            RESULTS: {filteredCars.length} / {cars.length}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[160px] gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredCars.map((car, idx) => (
                            <motion.div
                                layout
                                key={car.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/vehicle/${car.id}`)}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={
                                    "hover:cursor-pointer group relative overflow-hidden bg-zinc-900 border border-white/5 md:col-span-1 md:row-span-1"
                                }
                            >
                                <div
                                    className="absolute inset-0 transition-all duration-700 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 opacity-30 group-hover:opacity-100"
                                    style={{
                                        backgroundImage: `url(${car.image})`,
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

                                    <div>
                                        <h2
                                            className="text-sm md:text-base font-black italic uppercase leading-none tracking-tighter"
                                            style={{ fontFamily: "Oswald" }}
                                        >
                                            {car.name}
                                        </h2>
                                    </div>
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
    );
};

export default CollectionScreen;
