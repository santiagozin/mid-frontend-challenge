
import logo from "../../../public/logo.webp";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="flex items-center justify-between h-[64px] pt-4 px-10 fixed top-0 left-0 right-0 z-[1000] bg-white lg:bg-transparent">
        <div className="flex items-center gap-2">
            <Link to="/">
                <img src={logo} alt="logo" width={200} height={200} />
            </Link>
            <h1 className="text-xl font-bold uppercase ml-4">Valuations</h1>
        </div>
    </header>
  );
};

export default Navbar;
