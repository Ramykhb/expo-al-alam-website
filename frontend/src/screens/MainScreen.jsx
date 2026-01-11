import NavBar from "../components/NavBar";
import { Instagram, MessageCircle, Music2 } from "lucide-react";

const MainScreen = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#080808]">
      <style>
        {`
            @keyframes slideRightFade {
                from {
                    opacity: 0;
                    transform: translateX(-60px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideLeftFade {
                from {
                    opacity: 0;
                    transform: translateX(120px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `}
      </style>

      <div
        className="w-full h-[90%]"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(45, 55, 75, 0.7) 0%, rgba(8, 8, 8, 1) 75%)",
          fontFamily: "Bebas Neue",
        }}
      >
        <NavBar />
        <div
          className="flex flex-col flex-1 px-20 pt-7"
          style={{ fontFamily: "Oswald" }}
        >
          <h1 className="text-white text-6xl md:text-7xl font-black mb-8 uppercase italic tracking-tight pr-4 opacity-0 animate-[slideRightFade_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]">
            Fuel Your{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-[#64748b] via-white to-[#1e293b] px-3">
              Ambition
            </span>
          </h1>

          <p className="w-[40%] text-white text-lg mt-5 opacity-0 animate-[slideRightFade_0.8s_ease-out_0.4s_forwards]">
            Step into a world where engineering meets imagination. Our expo
            brings together the visionaries, the machines, and the technology
            that will define the roads of tomorrow.
          </p>

          <button
            className="relative overflow-hidden group w-56 h-14 bg-white text-black mt-12 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 opacity-0 animate-[slideRightFade_0.8s_ease-out_0.6s_forwards] active:scale-95 hover:cursor-pointer 
  hover:shadow-[0_0_30px_5px_rgba(45,55,75,0.8)] hover:border-transparent"
          >
            <span className="absolute inset-0 bg-[#1e293b] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Browse Collection
            </span>
          </button>
        </div>
      </div>

      <img
        src="/mercedes.png"
        alt="Mercedes"
        className="w-[60%] h-auto absolute bottom-[-2%] left-[35%] z-20 opacity-0 animate-[slideLeftFade_1.4s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
      />

      <div className="w-full bg-white h-[10%] flex items-center px-20 justify-between">
        <span className="text-black text-[10px] tracking-[0.3em] uppercase font-bold font-sans">
          © Expo Al Alam
        </span>

        <div className="h-[1px] flex-1 mx-10 bg-black/10" />

        <div className="flex items-center gap-8">
          <a
            href="#"
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
            href="#"
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
            href="#"
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

export default MainScreen;
