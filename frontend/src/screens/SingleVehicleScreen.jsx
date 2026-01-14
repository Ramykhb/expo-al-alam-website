import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import {
    ChevronLeft,
    ChevronRight,
    Gauge,
    Box,
    Calendar,
    Zap,
    Palette,
    Droplets,
    Trash2,
    Edit3,
    Check,
    X,
    ShoppingBag,
    PenTool,
    Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import api from "../../config/axios";

const SingleVehicleScreen = () => {
    const [activeImg, setActiveImg] = useState(0);
    const { id: carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const res = await api.get(`/vehicles/${carId}`);
                const carData = res.data.car;
                setCar({
                    ...carData,
                    images: carData.image_links || [],
                });
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        fetchCarData();
    }, [carId]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await api.get("/auth/status");
                if (res.data.loggedIn) {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.log("Auth check failed");
            }
        };
        checkLoggedIn();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Confirm deletion of this unit?")) {
            navigate("/collection");
        }
    };

    if (!car) {
        return (
            <div className="w-full h-screen bg-[#080808] flex items-center justify-center">
                <div className="text-white tracking-[0.5em] text-[10px] uppercase animate-pulse">
                    Initializing System...
                </div>
            </div>
        );
    }

    const specFields = [
        {
            key: "power",
            label: "Power",
            icon: <Gauge size={14} />,
            suffix: " HP",
        },
        { key: "transmission", label: "Transmission", icon: <Box size={14} /> },
        { key: "year", label: "Year", icon: <Calendar size={14} /> },
        {
            key: "mileage",
            label: "Mileage",
            icon: <Zap size={14} />,
            suffix: " KM",
        },
        {
            key: "exterior_color",
            label: "Exterior",
            icon: <Palette size={14} />,
        },
        {
            key: "interior_color",
            label: "Interior",
            icon: <Droplets size={14} />,
        },
    ];

    return (
        <div className="w-full h-screen bg-[#080808] text-white flex flex-col overflow-y-auto md:overflow-hidden">
            {/* Header: Fixed 15% height on desktop */}
            <div className="md:h-[15vh] shrink-0">
                <NavBar />
            </div>

            {/* Main Section */}
            <main className="flex-1 flex flex-col md:flex-row bg-[#080808] md:h-[75vh] md:overflow-hidden">
                {/* Left: Images */}
                <section className="w-full md:flex-1 flex flex-col p-4 md:p-6 pb-2 gap-3 shrink-0 md:min-h-0">
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

                    <div className="aspect-video md:flex-1 relative bg-zinc-900 rounded-sm overflow-hidden group border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImg}
                                src={`http://localhost:3000${car.images[activeImg]}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10">
                            <button
                                onClick={() =>
                                    setActiveImg((prev) =>
                                        prev > 0
                                            ? prev - 1
                                            : car.images.length - 1
                                    )
                                }
                                className="md:p-3 bg-black/80 border border-white/10 hover:bg-white hover:text-black transition-all h-6 w-6 flex items-center justify-center mt-2 md:h-12 md:w-12"
                            >
                                <ChevronLeft className="w-[8px] h-[8px] md:w-[14px] md:h-[14px]" />
                            </button>
                            <button
                                onClick={() =>
                                    setActiveImg((prev) =>
                                        prev < car.images.length - 1
                                            ? prev + 1
                                            : 0
                                    )
                                }
                                className="md:p-3 bg-black/80 border border-white/10 hover:bg-white hover:text-black transition-all h-6 w-6 flex items-center justify-center mt-2 md:h-12 md:w-12"
                            >
                                <ChevronRight className="w-[8px] h-[8px] md:w-[14px] md:h-[14px]" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 h-14 shrink-0 mb-2 overflow-x-auto no-scrollbar">
                        {car.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`min-w-[80px] flex-1 h-full border transition-all duration-300 ${
                                    activeImg === i
                                        ? "border-white/40"
                                        : "border-white/5 opacity-40 hover:opacity-100"
                                }`}
                            >
                                <img
                                    src={`http://localhost:3000${img}`}
                                    className="w-full h-full object-cover grayscale"
                                    alt="car"
                                />
                            </button>
                        ))}
                    </div>
                </section>

                {/* Right: Specs & Actions */}
                <section className="w-full md:flex-[0.8] flex flex-col md:border-l border-white/5 bg-[#080808] md:h-full">
                    {/* Brand & Name (Static) */}
                    <div className="px-6 md:px-8 pt-6 md:pt-10 pb-4 shrink-0">
                        {isEditing ? (
                            <input
                                name="brand"
                                value={car.brand}
                                onChange={handleInputChange}
                                className="bg-transparent border-b border-white/20 text-[#64748b] text-[9px] font-bold tracking-[0.4em] mb-1 outline-none w-full uppercase py-1"
                            />
                        ) : (
                            <p className="text-[#64748b] text-[9px] font-bold tracking-[0.4em] mb-1 uppercase">
                                {car.brand}
                            </p>
                        )}

                        {isEditing ? (
                            <input
                                name="name"
                                value={car.name}
                                onChange={handleInputChange}
                                className="bg-transparent border-b border-white/20 text-2xl md:text-3xl font-black uppercase italic tracking-tighter outline-none w-full mb-4 py-1"
                                style={{ fontFamily: "Oswald" }}
                            />
                        ) : (
                            <h1
                                className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none mb-4"
                                style={{ fontFamily: "Oswald" }}
                            >
                                {car.name}
                            </h1>
                        )}

                        <div className="flex justify-between items-center bg-white/5 p-3 border border-white/5">
                            {isEditing ? (
                                <div className="flex items-center gap-1 w-full">
                                    <span className="text-xl font-light">
                                        $
                                    </span>
                                    <input
                                        name="price"
                                        type="number"
                                        value={car.price}
                                        onChange={handleInputChange}
                                        className="bg-transparent text-xl font-light tracking-tight outline-none w-full"
                                    />
                                </div>
                            ) : (
                                <span className="text-xl font-light tracking-tight">
                                    {Number(car.price).toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 0,
                                    })}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="px-6 md:px-8 py-4 flex-1 overflow-hidden no-scrollbar">
                        <div className="grid grid-cols-2 gap-2 pb-6">
                            {specFields.map((field, i) => (
                                <div
                                    key={i}
                                    className="border border-white/5 p-3 flex flex-col gap-1 hover:bg-white/[0.02]"
                                >
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        {field.icon}
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
                                            {field.label}
                                        </span>
                                    </div>
                                    {isEditing ? (
                                        <input
                                            name={field.key}
                                            value={car[field.key] || ""}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-b border-white/10 text-sm font-bold uppercase italic outline-none w-full"
                                        />
                                    ) : (
                                        <span className="text-sm font-bold uppercase italic">
                                            {car[field.key]}
                                            {field.suffix}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-[#0c0c0c] shrink-0 border-t border-white/5 mt-auto">
                        {isAdmin ? (
                            <div className="flex gap-2 w-full">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 h-12 bg-white text-black font-bold uppercase text-[9px] tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Save size={14} /> Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="w-14 h-12 border border-white/10 text-white flex items-center justify-center"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex-1 h-12 bg-white text-black font-bold uppercase text-[9px] tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <PenTool size={14} /> Edit Vehicle
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-14 h-12 border border-red-900/50 text-red-500 flex items-center justify-center"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        `Hello, I would like to buy this car: ${car.brand} ${car.name} listed at $${car.price}.`
                                    );
                                    window.open(
                                        `https://wa.me/96181039626?text=${message}`,
                                        "_blank"
                                    );
                                }}
                                className="w-full h-12 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 active:scale-95"
                            >
                                <ShoppingBag size={16} /> Purchase Car
                            </button>
                        )}
                    </div>
                </section>
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

export default SingleVehicleScreen;
