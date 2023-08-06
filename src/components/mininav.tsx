import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../contexts/contentContext";
import { Category } from "../types";

type Props = {
  product?: string;
  hideMobileNav?: boolean;
  categories?: Category[];
};

function Mininav({ product, hideMobileNav, categories }: Props) {
  const { filters, resetAll, activeCategory, setFilters } =
    useContext(ContentContext);

  const tabsList = () => {
    if (filters.category == "all" && !product) {
      return (
        <li className='breadcrumb-item active'>
          <Link
            to={"/"}
            className='text-white'
            onClick={() => {
              resetAll();
            }}
          >
            Home
          </Link>
        </li>
      );
    }
    if (!product) {
      return (
        <>
          <li className='breadcrumb-item'>
            <Link
              to={"/"}
              className='text-white'
              onClick={() => {
                resetAll();
              }}
            >
              Home
            </Link>
          </li>
          <li className='breadcrumb-item text-white active'>
            {filters.category}
          </li>
        </>
      );
    }
    return (
      <>
        <li className='breadcrumb-item'>
          <Link
            to={"/"}
            className='text-white'
            onClick={() => {
              resetAll();
            }}
          >
            Home
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link
            to={`/category/${activeCategory}`}
            className='text-white'
            onClick={() => setFilters({ category: activeCategory as string })}
          >
            {activeCategory}
          </Link>
        </li>
        <li className='breadcrumb-item active text-white' aria-current='page'>
          {product}
        </li>
      </>
    );
  };

  function mobileList() {
    if (!categories) return <></>;
    let list = categories.map((category, index) => (
      <li className='nav-item' key={index}>
        <a href='#' className='nav-link ps-1 pe-0 py-2' onClick={() => setFilters({ category: category.name })}>
          <span className={`badge rounded-pill bg-pink fs-6 fw-medium ${filters.category != category.name && "opacity-75"}`}>
            {category.name}
          </span>
        </a>
      </li>
    ));
    list.unshift(
      <li className='nav-item' key={"todos"}>
        <a href='#' className='nav-link ps-1 pe-0 py-2' onClick={() => setFilters({ category: "all" })}>
          <span className={`badge rounded-pill bg-pink fs-6 fw-medium ${filters.category != "all" && "opacity-75"}`}>
            Todos
          </span>
        </a>
      </li>
    );
    return list
  }

  return (
    <>
      <nav
        aria-label='breadcrumb'
        className={`row m-0 bg-light_blue ${
          hideMobileNav ? "" : "d-sm-block d-none"
        }`}
      >
        <ol className='breadcrumb mb-0 px-3 px-sm-5 py-2'>{tabsList()}</ol>
      </nav>
      <nav
        className={`row m-0 bg-white ${
          hideMobileNav ? "d-none" : "d-flex d-sm-none"
        }`}
      >
        <ul className='nav overflow-x-auto flex-nowrap ps-2'>{mobileList()}</ul>
      </nav>
    </>
  );
}

export default Mininav;
