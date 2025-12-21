import navMenuItems from "@/components/ui/Navbar/navbar-menu-items";
import useAuth from "./useAuth";

const useNav = () => {
  const { isAuthenticated } = useAuth();
  if (typeof isAuthenticated === "boolean") {
      return navMenuItems.filter(
        (item) =>
          (item.isAuth === undefined && item.isNotAuth === undefined) ||
          item.isAuth === isAuthenticated ||
          item.isNotAuth === !isAuthenticated
      );
  }
  return null
};

export default useNav;
