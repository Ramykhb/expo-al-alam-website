import NavBar from "../components/NavBar";

const MainScreen = () => {
  return (
    <div className="w-screen h-screen relative">
      <div
        className="w-full h-[85%]"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(214, 183, 139, 1) 0%, rgba(8, 8, 8, 1) 70%)",
          fontFamily: "Bebas Neue",
        }}
      >
        <NavBar />
        <div
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
        </div>
      </div>
      <div className="w-full bg-white" />
      <img
        src="/mercedes4.png"
        className="w-[60%] h-auto absolute bottom-[-5px] left-[30%] mx-auto"
      />
    </div>
  );
};

export default MainScreen;
