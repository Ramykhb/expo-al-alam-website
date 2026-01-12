import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { ArrowUpRight, Gauge, Zap } from "lucide-react";

const VEHICLE_COLLECTION = [
    {
        id: 1,
        name: "Phantom Stealth",
        series: "Apex // 01",
        engine: "6.0L V12",
        speed: "350 KM/H",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
        size: "large", // Spans 2 cols, 2 rows
    },
    {
        id: 2,
        name: "Midnight Monza",
        series: "Heritage // 04",
        engine: "Dual-Motor",
        speed: "320 KM/H",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80",
        size: "small",
    },
    {
        id: 3,
        name: "Carbon Wraith",
        series: "Limited // 09",
        engine: "4.5L V8",
        speed: "342 KM/H",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80",
        size: "small",
    },
    {
        id: 4,
        name: "Slate GT",
        series: "Prototypes // 02",
        engine: "Hybrid V6",
        speed: "335 KM/H",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80",
        size: "wide", // Spans 2 cols, 1 row
    },
];

const CollectionScreen = () => {
    return (
        <div className="w-full min-h-screen bg-[#080808] text-white overflow-x-hidden flex flex-col">
            <NavBar />

            <main className="flex-1 px-10 pt-10 pb-10">
                <header
                    className="mb-12 px-10"
                    style={{ fontFamily: "Oswald" }}
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-t from-[#64748b] via-white to-[#1e293b] pr-4">
                            Collection
                        </span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4 px-10">
                    {VEHICLE_COLLECTION.map((car, idx) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group relative overflow-hidden bg-zinc-900 border border-white/5 
                                ${
                                    car.size === "large"
                                        ? "md:col-span-2 md:row-span-2"
                                        : ""
                                }
                                ${
                                    car.size === "wide"
                                        ? "md:col-span-2 md:row-span-1"
                                        : ""
                                }
                                ${
                                    car.size === "small"
                                        ? "md:col-span-1 md:row-span-1"
                                        : ""
                                }
                            `}
                        >
                            {/* Image Background */}
                            <div
                                className="absolute inset-0 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 opacity-50 group-hover:opacity-80"
                                style={{
                                    backgroundImage: `url(${car.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />

                            {/* Info Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[9px] tracking-[0.3em] font-bold text-zinc-400 uppercase font-sans">
                                        {car.series}
                                    </span>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-white"
                                    />
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h2
                                        className="text-xl md:text-2xl font-black italic uppercase tracking-tight leading-none mb-2"
                                        style={{ fontFamily: "Oswald" }}
                                    >
                                        {car.name}
                                    </h2>

                                    {/* Tech Specs: Only visible on small/wide cards when hovered, or always on large */}
                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        <div className="flex items-center gap-1 text-zinc-400">
                                            <Zap size={12} />
                                            <span className="text-[9px] font-bold uppercase font-sans tracking-widest">
                                                {car.engine}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-zinc-400">
                                            <Gauge size={12} />
                                            <span className="text-[9px] font-bold uppercase font-sans tracking-widest">
                                                {car.speed}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Footer consistent with other pages */}
            <footer className="w-full bg-white h-20 flex items-center px-20 justify-between">
                <span className="text-black text-[10px] tracking-[0.3em] uppercase font-bold font-sans">
                    © Expo Al Alam
                </span>
                <div className="h-px flex-1 mx-10 bg-black/10" />
                <div className="flex gap-8">
                    <span className="text-black text-[9px] tracking-[0.2em] uppercase font-bold font-sans cursor-pointer hover:opacity-50">
                        Filter By Era
                    </span>
                    <span className="text-black text-[9px] tracking-[0.2em] uppercase font-bold font-sans cursor-pointer hover:opacity-50">
                        Request Catalog
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default CollectionScreen;
