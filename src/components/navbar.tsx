import "./css/navbar.css";
import { Link } from "react-router-dom";
import { Category } from "../types";
import CartDetail from "./cartDetail";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { ContentContext } from "../contexts/contentContext";
import "bootstrap/js/dist/collapse"

type Props = {
  categories: Category[] | null;
  hideCart?: boolean
};

function Navbar({ hideCart }: Props) {
  hideCart = true
  const { cartList } = useContext(CartContext);
  const { resetAll } = useContext(ContentContext)
  const [cartButton, setCartButton] = useState(true);

  return (
    <>
      <nav
        className='navbar navbar-expand-sm py-0 bg-main_blue'
        data-bs-theme='dark'
      >
        <div className='container-fluid'>
          <Link className='navbar-brand pt-1' to={"/"}>
            <img
              src='/dino2.png'
              alt='Logo'
              width='45'
              height='45'
              className='d-inline-block align-text-bottom'
            />
            <span className='main_logo'>{"  "}DinoKids</span>
          </Link>
          <button
            className='navbar-toggler bg-secondary_blue'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => {
              const mimic = cartButton;
              if (mimic) setCartButton(!mimic);
              else setTimeout(() => setCartButton(!mimic), 350);
            }}
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link
                className='nav-link active fw-bold'
                aria-current='page'
                to={"/"}
                onClick={() => resetAll()}
              >
                Home
              </Link>
              <a
                className='fw-bold nav-link active'
                data-bs-toggle='offcanvas'
                data-bs-target='#offcanvas'
                aria-controls='offcanvas'
                hidden={hideCart}
              >
                Carrito
              </a>
              <Link to={"/contact"} className='nav-link active fw-bold'>
                Dirección y Contacto
              </Link>
            </div>
          </div>
          <button
            className='btn btn-secondary_blue position-relative'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvas'
            aria-controls='offcanvas'
            hidden={!cartButton || hideCart}
          >
            <img src='/cart.png' height='30' width='30' />
            <span className='px-1 position-absolute start-100 mt-1 top-0 translate-middle badge rounded-pill bg-danger'>
              {cartList.length.toString().padStart(2, "0")}
            </span>
          </button>
        </div>
      </nav>
      <div
        className='offcanvas offcanvas-start bg-pink text-white'
        data-bs-scroll='true'
        tabIndex={-1}
        id='offcanvas'
        aria-labelledby='offcanvasLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title fs-4 fw-normal' id='offcanvasLabel'>
            Carrito
          </h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body px-1'>
          <CartDetail />
          <Link to={"/checkout"}>
            {cartList.length > 0 ? (
              <button className='btn btn-primary'>Comprar</button>
            ) : (
              <></>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
