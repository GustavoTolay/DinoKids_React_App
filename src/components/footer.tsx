import { Link } from "react-router-dom";
import "./footer.css"

const Footer = () => {
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    window.localStorage.removeItem("UserSession");
  };

  const UserSession = () => {
    const url = window.location.pathname;

    const token = window.localStorage.getItem("UserSession");
    if (token == null) {
      return (
        <Link className='nav-link fw-bold active' to={"/Login"}>
          Iniciar Sesion
        </Link>
      );
    }
    return (
      <>
        <Link
          className='nav-link fw-bold active'
          to={url}
          onClick={handleLogout}
        >
          Cerrar Sesion
        </Link>
      </>
    );
  };

  return (
    <>
      <div className='py-2 px-5 sape'>
        {UserSession()}
      </div>
    </>
  );
};

export default Footer;
