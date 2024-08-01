import { useState } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const handleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div className="bg-slate-50 dark:bg-[#111331] h-16 shadow-md flex items-center justify-between px-10">
      {/* logo */}
      <img src="logo.png" alt="" className="h-12 dark:invert" />

      {/* toggle theme mode  */}
      <div className="text-3xl dark:text-white">
        <button onClick={() => handleDarkMode()}>
          {dark && <MdOutlineLightMode />}
          {!dark && <IoMoonSharp />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
