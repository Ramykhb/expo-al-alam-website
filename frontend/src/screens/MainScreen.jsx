import NavBar from "../components/NavBar";

const MainScreen = () => {
  return (
    <div className="w-screen h-screen relative">
      <div
        className="w-full h-[100%]"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(214, 183, 139, 1) 0%, rgba(8, 8, 8, 1) 70%)",
          fontFamily: "Bebas Neue",
        }}
      >
        <NavBar />
        {/* <div
          className="flex flex-col flex-1 px-20"
          style={{ fontFamily: "Oswald" }}
        >
          <h1 className="font-bold text-white text-[4em]">
            Fuel Your Ambition
          </h1>
          <p className="w-[40%] text-white text-lg mt-5">
            Step into a world where engineering meets imagination. Our expo
            brings together the visionaries, the machines, and the technology
            that will define the roads of tomorrow. Don't just watch the future
            happen—drive it.
          </p>
        </div> */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
          {/* The Event Tag */}
          <span className="text-white/60 tracking-[0.5em] text-sm uppercase mb-4">
            Expo Al Alam
          </span>

          {/* The Hero Headline */}
          <h1 className="text-white text-6xl md:text-8xl font-black tracking-tight mb-8 uppercase italic">
            Fuel Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-500 w-full px-4">
              Ambition
            </span>
          </h1>

          {/* The Long Description */}
          <p className="max-w-2xl text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Step into a world where engineering meets imagination. Our expo
            brings together the visionaries, the machines, and the technology
            that will define the roads of tomorrow. Don't just watch the future
            happen—drive it.
          </p>

          {/* Call to Action */}
          <button className="mt-12 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Browse Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
