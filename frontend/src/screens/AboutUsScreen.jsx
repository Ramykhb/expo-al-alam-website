import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";

const Counter = ({ value }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) motionValue.set(value);
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) ref.current.textContent = Math.floor(latest);
        });
    }, [springValue]);

    return <span ref={ref}>0</span>;
};

const AboutUsScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen relative overflow-x-hidden bg-[#080808]">
            <style>
                {`
          @keyframes slideRightFade {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>

            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 120%, rgba(45, 55, 75, 0.4) 0%, rgba(8, 8, 8, 1) 80%)",
                }}
            />

            <div className="relative z-10">
                <NavBar />

                <section
                    className="relative h-[85vh] flex items-center px-20 overflow-hidden"
                    style={{ fontFamily: "Oswald" }}
                >
                    <motion.h1
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 0.03, x: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[25vw] font-black italic uppercase leading-none pointer-events-none whitespace-nowrap text-white"
                    >
                        AL ALAM
                    </motion.h1>

                    <div className="relative z-10 w-full flex justify-between items-center mb-20">
                        <div className="max-w-4xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="tracking-[0.8em] text-xs uppercase text-[#64748b] mb-6 block font-sans font-bold"
                            >
                                Trusted Car Trading // Since 2015
                            </motion.span>

                            <h1 className="text-white text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.9] animate-[slideRightFade_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
                                Driving The
                                <br />
                                Right{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-t from-[#64748b] via-white to-[#1e293b] pr-6">
                                    Choice
                                </span>{" "}
                            </h1>

                            <div className="flex items-center gap-6 mt-10 opacity-0 animate-[slideRightFade_0.8s_ease-out_0.6s_forwards]">
                                <div className="w-20 h-px bg-[#1e293b]" />
                                <p className="text-zinc-500 font-sans uppercase tracking-widest text-[10px] font-bold">
                                    Buying • Selling • Trading Cars
                                </p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="hidden lg:block relative w-96 h-96 border border-white/10 bg-white/5 backdrop-blur-xl rounded-sm p-8"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64748b] to-transparent" />
                            <div className="h-full flex flex-col justify-between italic">
                                <span className="text-[#64748b] text-4xl font-black">
                                    01
                                </span>
                                <div>
                                    <h4 className="text-white text-xl font-bold uppercase mb-2">
                                        Quality Vehicles
                                    </h4>
                                    <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                                        A carefully selected range of vehicles
                                        for every need, from reliable daily
                                        drivers to premium options, all in one
                                        place.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div
                        className="absolute bottom-[15%] right-0 w-[70%] h-[80%] opacity-20 pointer-events-none grayscale contrast-125"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            maskImage:
                                "linear-gradient(to left, black, transparent)",
                            WebkitMaskImage:
                                "linear-gradient(to left, black, transparent)",
                        }}
                    />
                </section>

                <section className="px-20 grid md:grid-cols-2 gap-20 items-center py-20 overflow-hidden">
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.2,
                        }}
                    >
                        <h2
                            className="text-white text-4xl font-bold uppercase italic"
                            style={{ fontFamily: "Oswald" }}
                        >
                            Who We Are
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed font-sans w-[90%]">
                            Expo Al Alam is a car dealership and trading
                            platform dedicated to connecting people with the
                            right vehicles. We buy, sell, and trade cars with a
                            focus on trust, value, and long-term relationships.
                        </p>
                        <p className="text-zinc-500 text-md font-sans italic">
                            "Every car has a story, we help you find yours."
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 120 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                            <img
                                src="/rearCar.jpeg"
                                alt="Engine detail"
                                className="grayscale opacity-60 hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 0.5, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1e293b] -z-10"
                        />
                    </motion.div>
                </section>

                <section className="bg-white py-10 mt-20">
                    <div
                        className="max-w-7xl mx-auto px-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
                        style={{ fontFamily: "Bebas Neue" }}
                    >
                        <div className="group">
                            <span className="block text-6xl text-black mb-2 tracking-tighter italic">
                                <Counter value={1200} />+
                            </span>
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-400">
                                Cars Sold & Traded
                            </span>
                        </div>
                        <div>
                            <span className="block text-6xl text-black mb-2 tracking-tighter italic">
                                <Counter value={12} />
                            </span>
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-400">
                                Dealer Partners
                            </span>
                        </div>
                        <div>
                            <span className="block text-6xl text-black mb-2 tracking-tighter italic">
                                <Counter value={150} />+
                            </span>
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-400">
                                Cars in Inventory
                            </span>
                        </div>
                        <div>
                            <span className="block text-6xl text-black mb-2 tracking-tighter italic">
                                <Counter value={30} />+
                            </span>
                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-zinc-400">
                                Years of Experience
                            </span>
                        </div>
                    </div>
                </section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="py-40 flex flex-col items-center"
                >
                    <motion.h3
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-white text-3xl uppercase italic mb-10 tracking-widest"
                        style={{ fontFamily: "Oswald" }}
                    >
                        Find Your Next Car
                    </motion.h3>

                    <motion.button
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative overflow-hidden group w-64 h-16 bg-white text-black text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 hover:cursor-pointer hover:shadow-[0_0_30px_5px_rgba(45,55,75,0.8)]"
                        onClick={() => {
                            navigate("/collection");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <span className="absolute inset-0 bg-[#1e293b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

                        <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-sans">
                            Browse Our Cars
                        </span>
                    </motion.button>
                </motion.section>

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

export default AboutUsScreen;
