import { Nav } from "../nav";

const Header = () => {
  return (
    <header className="bg-white text-green-500 font-bold sticky top-0 flex-wrap z-[20] mx-auto mb-8 fex w-full items-center justify-between border-b-2">
      <Nav />
    </header>
  );
};

export default Header;
