import LanguageSwitch from "../taskbar/LanguageSwitch";
import DarkModeSwitch from "../taskbar/DarkModeSwitch";
import Logo from "../common/Logo";

const Navigation: React.FC = () => {
  return (
    <nav className="border-b-[1px] border-black dark:border-gray-600">
      <div className="flex items-center justify-between px-2 py-4 max-w-[1280px] mx-auto">
        <div>
          <Logo />
        </div>
        <div className="flex">
          <LanguageSwitch />
          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
