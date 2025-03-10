import { bottomBarLinks } from "@/constants";
import { useLocation, Link } from "react-router-dom";
const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottomBarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={` ${isActive && "invert-white"}`}
              width={20}
              height={20}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
