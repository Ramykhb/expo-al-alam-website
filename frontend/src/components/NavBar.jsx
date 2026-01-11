const NavBar = () => {
  return (
    <>
      <div className="w-full h-22 px-10 flex items-center justify-between">
        <img src="/logo.png" alt="Logo" className="w-[10%] h-auto mb-4" />

        <ul className="flex flex-row w-[40%] justify-around text-white text-2xl">
          {["COLLECTION", "ABOUT US", "CONTACT US"].map((item) => (
            <li key={item} className="relative group py-2">
              <a
                href={`pages/${item.toLowerCase().replace(" ", "")}.html`}
                className="text-white tracking-wide"
              >
                {item}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
