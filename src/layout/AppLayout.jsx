import Navbar from "../components/navbar/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen h-full dark:bg-[#262b4b] dark:text-white">
      <Navbar />
      <div className="m-7">{children}</div>
    </div>
  );
};

export default AppLayout;
