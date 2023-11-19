import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";

function AdminPanel() {
  const token = useLocalStorage("UserSession");
  const sessionExpires = useLocalStorage("SessionExpiresIn");
  const session = token.get();
  const [timeLeft, setTimeLeft] = useState<Date>();

  const timer = (expireDate: number) => {
    const checkDate = () => {
      const counterDuration = expireDate - Date.now();
      if (counterDuration > 0) {
        setTimeLeft(new Date(counterDuration));
        console.log(counterDuration);
      } else {
        token.remove();
      }
    };
    setInterval(checkDate, 1000);
  };

  useEffect(() => {
    const expireDate = sessionExpires.get() as number;
    if (expireDate) {
      timer(expireDate);
    }
  }, []);

  const showBadge = () => {
    if (!session) return <span>&#x1F512; </span>;
    return <></>;
  };

  return (
    <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
      <Navbar categories={null}></Navbar>
      <div className='row m-0 mt-3'>
        <h2 className='text-start m-0 fw-light'>Acciones</h2>
        <hr />
      </div>
      <div className='row m-0 ms-2'>
        <ul className='list-group list-group-flush text-start'>
          <li className='list-group-item'>
            <Link to={"/login"}>Iniciar Sesión</Link>
          </li>
          <li className={`list-group-item ${!session && "disabled"}`}>
            {showBadge()}
            <Link
              className='disabled'
              reloadDocument
              to={"#"}
              onClick={() => {
                token.remove();
                sessionExpires.remove();
              }}
            >
              Cerrar Sesión
            </Link>
          </li>

          <li className={`list-group-item ${!session && "disabled"}`}>
            {showBadge()}
            <Link to={"/admin/products"}>Administrar Productos</Link>
          </li>
          <li className={`list-group-item ${!session && "disabled"}`}>
            {showBadge()}
            <Link to={"#"}>Administrar Categorias</Link>
          </li>
        </ul>
      </div>
      <div className='fixed-bottom'>
        <div className='alert alert-primary px-5 py-3 col-3 mx-auto'>
          La sesión expira en: {timeLeft?.getMinutes() || "--"}:
          {timeLeft?.getSeconds().toString().padStart(2, "0") || "--"}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
