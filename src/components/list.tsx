import { Product } from "../types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContentContext } from "../contexts/contentContext";
import "./css/list.css";

interface Props {
  products: Product[];
}

function List({ products }: Props) {
  const { setActiveCategory } = useContext(ContentContext);

  return (
    <div className='col-12 col-sm-9 col-lg-10 p-0'>
      <div className='m-0 px-2 pb-2 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2'>
        {products.map((product) => {
          return (
            <div className='col' key={product._id}>
              <Link
                to={`/product/${product._id}`}
                onClick={() => setActiveCategory(product.category)}
              >
                <div className='card p-1 border-2 m-0 px-1 h-100 product'>
                  <div className='ratio ratio-1x1'>
                    <img
                      className='card-img-top h-100 rounded'
                      src={`https://dinokids.site/resized/${product.image}`}
                    />
                  </div>
                  <div className='card-body m-0 mt-1 p-0'>
                    <p className='card-title m-0'>{product.name}</p>
                    <h4 className='card-text fw-normal m-0'>
                      ${product.price}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className=''></div>
    </div>
  );
}

export default List;
