import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

const { cartList, reduceCartList } = useContext(CartContext);

const CartDetail = () => {
  const productList = () => {
    const list = cartList.map((e) => {
      return (
        <div className='row card'>
          <img src={`https://dinokids.site/${e.image}`} className='col-3' />
          <div className='card-body col-9'>
            <h6 className="card-title">{e.name}</h6>
            <h6 className="card-text">{e.description}</h6>
            <span className="badge">{e.model}</span>
            <span className="badge">{e.size}</span>
            <p>Precio: {e.price}</p>
            <button className="btn btn-danger">Quitar</button>
          </div>
        </div>
      );
    });
    return list;
  };

  return <>{productList()}</>;
};

export default CartDetail;
