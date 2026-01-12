import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import NavBar from "../components/NavBar";

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
      if (ref.current)
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        );
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const AboutUsExpo = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spotlight logic
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-[#0d0d0d] text-white font-serif overflow-x-hidden relative"
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 80%)`,
        }}
      />

      <NavBar />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="z-10"
        >
          {/* Replaced gold with light carbon/silver */}
          <span className="tracking-[0.6em] text-xs uppercase text-zinc-500 mb-4 block font-sans">
            Established MMXXVI
          </span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 text-zinc-100">
            Expo <br /> <span className="italic font-normal">Al Alam.</span>
          </h1>
          <div className="w-px h-24 bg-gradient-to-b from-zinc-700 to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale" />
      </section>

      {/* 2. PHILOSOPHY */}
      <section className="py-32 px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h2
            variants={textReveal}
            className="text-4xl mb-8 font-light text-zinc-200"
          >
            Beyond the Showroom.
          </motion.h2>
          <motion.p
            variants={textReveal}
            className="text-zinc-500 text-lg leading-relaxed mb-6 font-sans"
          >
            Expo Al Alam isn't a marketplace; it is a sanctuary for the world's
            most significant automotive achievements.
          </motion.p>
          <motion.p
            variants={textReveal}
            className="text-zinc-500 text-lg leading-relaxed font-sans"
          >
            Founded by a collective of historians and collectors, we serve as
            the bridge between heritage and the silent velocity of the future.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative h-[600px] border border-zinc-800 p-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-125" />
          {/* Carbon decorative corner */}
          <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-zinc-600" />
        </motion.div>
      </section>

      {/* 3. THE STATS */}
      <section className="py-20 bg-[#141414] text-white border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center font-sans">
          {[
            { label: "Asset Valuation", val: 400, prefix: "$", suffix: "M+" },
            { label: "Global Premières", val: 50 },
            { label: "Countries Represented", val: 12 },
            { label: "Unrivaled Standard", val: 1, prefix: "0" },
          ].map((stat, i) => (
            <div key={i}>
              <span className="block text-4xl font-light mb-2 text-zinc-100">
                {stat.prefix}
                <Counter value={stat.val} />
                {stat.suffix}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-40 text-center relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textReveal}
        >
          <h2 className="text-5xl font-light mb-10 text-zinc-200">
            Experience the Apex.
          </h2>
          <button className="px-12 py-4 border border-zinc-700 text-zinc-300 hover:bg-white hover:text-black transition-all duration-700 uppercase tracking-[0.4em] text-xs font-sans bg-transparent">
            Request Private Access
          </button>
        </motion.div>
      </section>

      <footer className="py-10 border-t border-zinc-900 text-center text-zinc-700 text-[10px] tracking-[0.5em]">
        &copy; 2026 EXPO AL ALAM. PRIVATE EXHIBITION.
      </footer>
    </div>
  );
};

export default AboutUsExpo;
