import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sideBarLinks } from "@/constants";
import { INavLink } from "@/types";
const LeftSideBar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
      //this means reloads the whole page, and then as per useEffect of useContext, it will return to sign-in route,
    }
  }, [isSuccess]);
  const { pathname } = useLocation();
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            height={30}
            width={30}
          />
          <h2 className="text-lg font-bold">AmanGram</h2>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sideBarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 hover:bg-primary-500-hover group"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
