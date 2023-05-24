import { Product } from "../types";
import { Link } from "react-router-dom";
import "./list.css";

interface Props {
  products: Product[];
}

function List({ products }: Props) {
  return (
    <div className='col-12 col-sm-9 col-lg-10 p-0 list lista'>
      <div className='m-0 px-2 pb-2 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2'>
        {products.map((product) => {
          return (
            <div className='col' key={product._id}>
              <div className='card col p-1 border-2 m-0 product'>
                <Link
                  state={{ id: product._id }}
                  className='card-img-top'
                  to={`/product/${product._id}`}
                >
                  <img className='card-img-top h-100 rounded banana' src={`https://dinokids.site/${product.image}`} />
                </Link>
                <div className='card-body m-0 p-0'>
                  <p className='card-title m-0'>{product.name}</p>
                  <h5 className='card-text m-0'>$ {product.price}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=''></div>
    </div>
  );
}

export default List;
