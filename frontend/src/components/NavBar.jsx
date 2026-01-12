import { Link } from "react-router";

const NavBar = () => {
    return (
        <>
            <div
                className="w-full h-[15vh] px-10 flex items-center justify-between"
                style={{
                    fontFamily: "Bebas Neue",
                }}
            >
                <Link to={"/"} className="w-[10%] h-auto mb-2 ml-8">
                    <img src="/logo.png" alt="Logo" className="w-auto h-auto" />
                </Link>

                <ul className="flex flex-row w-[40%] justify-around text-white text-2xl">
                    {["COLLECTION", "ABOUT US", "CONTACT US"].map((item) => (
                        <li key={item} className="relative group py-2">
                            <a
                                href={`/${item
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
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
