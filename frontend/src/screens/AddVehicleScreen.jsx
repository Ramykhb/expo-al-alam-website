import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import {
    Upload,
    X,
    CheckCircle2,
    Star,
    Image as ImageIcon,
    Info,
    Loader2,
} from "lucide-react";
import axios from "axios";

const AddVehicleScreen = () => {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("Ready");

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        series: "",
        year: "",
        price: "",
        mileage: "",
        power: "",
        transmission: "",
        exterior: "",
        interior: "",
    });

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            isMain: false,
        }));
        if (images.length === 0 && newImages.length > 0)
            newImages[0].isMain = true;
        setImages([...images, ...newImages]);
    };

    const setMainImage = (index) => {
        setImages(images.map((img, i) => ({ ...img, isMain: i === index })));
    };

    const removeImage = (index) => {
        const wasMain = images[index].isMain;
        const filtered = images.filter((_, i) => i !== index);
        if (wasMain && filtered.length > 0) filtered[0].isMain = true;
        setImages(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["name", "brand", "price"];
        const missing = requiredFields.filter((f) => !formData[f]);

        if (missing.length > 0 || images.length === 0) {
            alert(
                "Vehicle Name, Brand, Price, and at least one image are required."
            );
            return;
        }

        setStatus("Transmitting");

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            images.forEach((img, index) => {
                data.append("images", img.file);
                if (img.isMain) data.append("mainImageIndex", index);
            });

            const response = await axios.post(
                "http://localhost:3000/api/add-vehicle",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.data.success) {
                setStatus("Success");
                alert("Vehicle deployed to collection.");
                setImages([]);
                setFormData({
                    name: "",
                    brand: "",
                    series: "",
                    year: "",
                    price: "",
                    mileage: "",
                    power: "",
                    transmission: "",
                    exterior: "",
                    interior: "",
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("Error");
            alert(error.response?.data?.error || "Transmission failed.");
        } finally {
            setTimeout(() => setStatus("Ready"), 3000);
        }
    };

    const inputStyle =
        "w-full h-11 bg-white/5 border border-white/10 px-4 text-[12px] md:text-[11px] font-bold tracking-widest focus:outline-none focus:border-white/40 transition-all uppercase placeholder:text-zinc-700";
    const labelStyle =
        "text-[9px] md:text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2";

    return (
        <div className="w-full min-h-screen md:h-screen bg-[#080808] text-white flex flex-col">
            <NavBar />
            <main className="flex-1 flex flex-col md:flex-row md:h-[75vh] bg-[#080808] border-t border-white/5 overflow-y-auto md:overflow-hidden">
                <section className="w-full md:w-[40%] p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0">
                    <div className="mb-6">
                        <h2
                            className="text-2xl font-black italic uppercase tracking-tighter leading-none"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Media Vault
                        </h2>
                        <p className="text-[9px] text-zinc-500 font-bold tracking-widest mt-1 uppercase">
                            Primary Asset Selection
                        </p>
                    </div>

                    <div className="md:flex-1 md:overflow-y-auto pr-0 md:pr-2 space-y-4 no-scrollbar">
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.05] transition-all group shrink-0">
                            <Upload
                                size={20}
                                className="text-zinc-700 group-hover:text-white transition-all"
                            />
                            <span className="text-[8px] font-bold tracking-[0.3em] mt-2 text-zinc-500 uppercase">
                                Add Assets
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleImageUpload}
                                multiple
                                accept="image/*"
                            />
                        </label>

                        <div className="grid grid-cols-2 gap-3 pb-6 md:pb-0">
                            <AnimatePresence>
                                {images.map((img, i) => (
                                    <motion.div
                                        key={img.preview}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`relative aspect-video rounded-sm overflow-hidden group border-2 transition-all duration-300 ${
                                            img.isMain
                                                ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                                : "border-transparent bg-zinc-900"
                                        }`}
                                    >
                                        <img
                                            src={img.preview}
                                            className="w-full h-full object-cover"
                                            alt="upload"
                                        />
                                        {img.isMain && (
                                            <div className="absolute top-0 left-0 bg-white text-black z-10">
                                                <span className="text-[7px] font-black uppercase tracking-tighter px-2 py-1 block">
                                                    Primary Asset
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                                            {!img.isMain && (
                                                <button
                                                    onClick={() =>
                                                        setMainImage(i)
                                                    }
                                                    className="p-2 bg-white/10 hover:bg-white hover:text-black rounded-full transition-all"
                                                >
                                                    <Star size={14} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="p-2 bg-red-600/20 hover:bg-red-600 text-white rounded-full transition-all"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                <section className="w-full md:w-[60%] flex flex-col bg-[#0c0c0c] md:bg-transparent">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col h-full"
                    >
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-4 md:flex-1 md:overflow-y-auto no-scrollbar content-start">
                            <div className="space-y-4">
                                <h3 className="text-[10px] text-white font-bold tracking-[0.3em] uppercase border-b border-white/10 pb-2 flex items-center gap-2">
                                    <ImageIcon size={12} /> Identity Specs
                                </h3>
                                <div>
                                    <label className={labelStyle}>
                                        Vehicle Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleTextChange}
                                        placeholder="PHANTOM STEALTH"
                                        className={inputStyle}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleTextChange}
                                            placeholder="ROLLS ROYCE"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>
                                            Series
                                        </label>
                                        <input
                                            type="text"
                                            name="series"
                                            value={formData.series}
                                            onChange={handleTextChange}
                                            placeholder="APEX // 01"
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleTextChange}
                                            placeholder="2026"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>
                                            Price ($)
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleTextChange}
                                            placeholder="2,450,000"
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pb-10 md:pb-0">
                                <h3 className="text-[10px] text-white font-bold tracking-[0.3em] uppercase border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Info size={12} /> Architecture
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>
                                            Mileage
                                        </label>
                                        <input
                                            type="text"
                                            name="mileage"
                                            value={formData.mileage}
                                            onChange={handleTextChange}
                                            placeholder="0 KM"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>
                                            Power (HP)
                                        </label>
                                        <input
                                            type="text"
                                            name="power"
                                            value={formData.power}
                                            onChange={handleTextChange}
                                            placeholder="1200"
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelStyle}>
                                        Transmission
                                    </label>
                                    <input
                                        type="text"
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleTextChange}
                                        placeholder="8-SPEED DCT"
                                        className={inputStyle}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelStyle}>
                                            Exterior
                                        </label>
                                        <input
                                            type="text"
                                            name="exterior"
                                            value={formData.exterior}
                                            onChange={handleTextChange}
                                            placeholder="SATIN BLACK"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>
                                            Interior
                                        </label>
                                        <input
                                            type="text"
                                            name="interior"
                                            value={formData.interior}
                                            onChange={handleTextChange}
                                            placeholder="RED ALCANTARA"
                                            className={inputStyle}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 p-6 md:p-8 border-t border-white/5 bg-[#0c0c0c] md:bg-transparent z-20 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-[8px] font-bold tracking-[0.4em] uppercase ${
                                        status === "Error"
                                            ? "text-red-500"
                                            : "text-zinc-600"
                                    }`}
                                >
                                    System Status: {status}
                                </span>
                                {status === "Transmitting" && (
                                    <Loader2
                                        size={12}
                                        className="animate-spin text-white"
                                    />
                                )}
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === "Transmitting"}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full md:w-auto bg-white text-black px-12 h-14 md:h-12 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:cursor-pointer transition-opacity ${
                                    status === "Transmitting"
                                        ? "opacity-50"
                                        : "opacity-100"
                                }`}
                            >
                                {status === "Transmitting"
                                    ? "Uploading Asset"
                                    : "Add to Collection"}
                                <CheckCircle2 size={16} />
                            </motion.button>
                        </div>
                    </form>
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

export default AddVehicleScreen;
