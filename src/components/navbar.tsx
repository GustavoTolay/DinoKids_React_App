import "./navbar.css";
import { Link } from "react-router-dom";
import { category } from "../types";
type Props = {
  categories: category[] | null;
};

function Navbar({ categories }: Props) {
  const dropdownList = () => {
    if (categories != null) {
      return (
        <>
          <a
            className='nav-link dropdown-toggle fw-bold active'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Categorias
          </a>
          <ul className='dropdown-menu mb-2'>
            {categories.map((e, i) => {
              return (
                <li key={i}>
                  <Link className='dropdown-item fw-normal' to={`/category/${e.name}`}>
                    {e.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      );
    }
    return <></>;
  };

  return (
    <nav className='navbar navbar-expand-sm py-0 nv' data-bs-theme='dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to={"/"}>
          <img
            src='/osito.png'
            alt='Logo'
            width='40'
            height='45'
            className='d-inline-block'
          />
          {"  "}DinoKids
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link
              className='nav-link active fw-bold'
              aria-current='page'
              to={"/"}
            >
              Home
            </Link>
            {dropdownList()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
