import { useContext } from "react";
import { CartContext, CartProduct } from "../contexts/cartContext";
import "./css/cartDetail.css";

type Props = {
  isCheckout?: true;
};

type ButtonsProps = {
  item: CartProduct;
};

const CartDetail = ({ isCheckout }: Props) => {
  const { cartList, reduceCartList } = useContext(CartContext);
  window.localStorage.setItem("cartList", JSON.stringify(cartList));

  const Buttons = ({ item }: ButtonsProps) => {
    return (
      <div className='col-auto'>
        <div className='input-group'>
          <button
            className='btn border fs-5 fw-bold botones py-0 pb-1'
            onClick={() => {
              reduceCartList({
                number: item.quantity + 1,
                product: item,
                type: "change",
              });
            }}
          >
            +
          </button>
          <span className='input-group-text border fs-5 py-0'>
            {item.quantity}
          </span>
          <button
            className='btn border fs-5 fw-bold botones py-0 pb-1'
            onClick={() => {
              if (item.quantity > 1)
                reduceCartList({
                  number: item.quantity - 1,
                  product: item,
                  type: "change",
                });
            }}
          >
            -
          </button>
        </div>
      </div>
    );
  };

  const setButtons = (item: CartProduct) => {
    if (!isCheckout)
      return (
        <>
          <Buttons item={item} />
          <div className='col-auto my-auto pe-0'>
            <button
              className='btn btn-danger btn-sm'
              onClick={() => {
                reduceCartList({
                  type: "delete",
                  product: item,
                  number: 0,
                });
              }}
            >
              Quitar
            </button>
          </div>
        </>
      );
    return (
      <>
        <h6 className="text-center">
          Cantidad:{" "}
          <span className='fw-normal'>{item.quantity}</span>
        </h6>
      </>
    );
  };

  const ProductList = () => {
    const list = cartList.map((item, i) => {
      return (
        <div className='card px-auto py-0 mb-1' key={i}>
          <div className='row'>
            <div className='col-3 p-0 my-auto'>
              <img
                src={`https://dinokids.site/${item.image}`}
                className='img-fluid cart-img'
              />
            </div>

            <div className='col-9 p-0'>
              <div className='card-body py-1'>
                <h6 className='card-title'>{item.name}</h6>
                <h6 className='card-text fw-normal'>
                  <span className="fw-semibold">Precio: </span>${item.price}
                  <span className='badge bg-primary ms-2'>{item.model}</span>
                  <span className='badge bg-primary ms-1'>{item.size}</span>
                </h6>
                <div className='row ms-auto'>{setButtons(item)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return <>{list}</>;
  };

  return <ProductList />;
};

export default CartDetail;
