import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../contexts/contentContext";

type Props = {
  product?: string
}

function Mininav({ product }: Props) {
  const { filters, resetAll } =
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
            to={`/category/${filters.category}`}
            className="text-white"
          >
            {filters.category}
          </Link>
        </li>
        <li className='breadcrumb-item active text-white' aria-current='page'>
          {product}
        </li>
      </>
    );
  };

  return (
    <nav aria-label='breadcrumb' className='row m-0 bg-light_blue'>
      <ol className='breadcrumb mb-0 px-3 px-sm-5 py-2'>{tabsList()}</ol>
    </nav>
  );
}

export default Mininav;
