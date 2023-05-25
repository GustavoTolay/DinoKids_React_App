import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

const CartDetail = () => {
  const { cartList, reduceCartList } = useContext(CartContext);

  const productList = () => {
    const list = cartList.map((item, i) => {
      return (
        <div className='row card' key={i}>
          <img src={`https://dinokids.site/${item.image}`} className='col-3' />
          <div className='card-body col-9'>
            <h6 className='card-title'>{item.name}</h6>
            <h6 className='card-text'>{item.description}</h6>
            <span className='badge'>{item.model}</span>
            <span className='badge'>{item.size}</span>
            <p>Precio: {item.price}</p>
            <button
              className='btn btn-danger'
              onClick={() => {
                reduceCartList({ type: "delete", product: item, number: 0 });
              }}
            >
              Quitar
            </button>
          </div>
        </div>
      );
    });
    return list;
  };

  return <>{productList()}</>;
};

export default CartDetail;
