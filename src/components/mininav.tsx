import { Link } from "react-router-dom";

interface Props {
  category: string | null;
  product: string | null;
}

function Mininav({ category, product }: Props) {
  const tabsList = () => {
    if (!category && !product) {
      return (
        <li className='breadcrumb-item'>
          <Link to={"/"} reloadDocument>
            Home
          </Link>
        </li>
      );
    }
    if (!product) {
      return (
        <>
          <li className='breadcrumb-item'>
            <Link to={"/"} reloadDocument>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item active'>{category}</li>
        </>
      );
    }
    return (
      <>
        <li className='breadcrumb-item'>
          <Link to={"/"} reloadDocument>
            Home
          </Link>
        </li>
        <li className='breadcrumb-item'>
          <Link to={`/category/${category}`} reloadDocument>
            {category}
          </Link>
        </li>
        <li className='breadcrumb-item active' aria-current='page'>
          {product}
        </li>
      </>
    );
  };

  return (
    <nav
      aria-label='breadcrumb'
      className='row m-0 border-bottom border-2 border-secondary-subtle'
    >
      <ol className='breadcrumb mb-0 px-3 px-sm-5 py-2'>{tabsList()}</ol>
    </nav>
  );
}

export default Mininav;
