import { Link } from "react-router-dom";
import { Inventory, Product } from "../types";
// import "./css/product.css";
import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";
import { CartContext } from "../contexts/cartContext";

interface Props {
  product: Product;
  available: boolean;
}

type ButtonsProps = {
  product: Product;
  model: string;
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
};

var key2 = 0;

function Buttons({ product, model, setQuantity, quantity }: ButtonsProps) {
  const { reduceCartList, cartList } = useContext(CartContext);
  const [size, setSize] = useState("default");
  const index = product.inventory.findIndex((e) => e.model == model);

  const Input = () => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSize(e.currentTarget.value);
      setQuantity(0);
    };

    return (
      <div className='col-auto p-0 my-auto me-3'>
        <select
          className='form-select fs-6'
          onChange={handleChange}
          value={size}
        >
          <option value='default' className='fs-6'>
            Talle
          </option>
          {product.inventory[index].sizes.map((e, i) => {
            if (e.stock)
              return (
                <option className='fs-6' value={e.size} key={i}>
                  {e.size}
                </option>
              );
          })}
        </select>
      </div>
    );
  };

  const sizeIndex = product.inventory[index].sizes.findIndex(
    (e) => e.size == size
  );
  const weight = product.inventory[index].sizes[sizeIndex]?.weight || 0;
  const currentStock = product.inventory[index].sizes[sizeIndex]?.stock || 0;
  const size_id = product.inventory[index].sizes[sizeIndex]?._id || "" as string
  console.log({size_id, weight, currentStock})
  const inCart =
    cartList.find(
      (e) => e.name == product.name && e.model == model && e.size == size
    )?.quantity || 0;

  return (
    <div className='row' hidden>
      <div className='col-auto'>
        <div className='input-group m-2 ms-0 m-sm-2'>
          <button
            className='btn btn-light fs-3 border botones fw-semibold py-0 pb-1'
            onClick={() => {
              if (quantity + inCart < currentStock) setQuantity(quantity + 1);
            }}
          >
            +
          </button>
          <span className='input-group-text fs-5 border px-3'>{quantity}</span>
          <button
            className='btn btn-light fs-3 border px-3 botones fw-semibold py-0 pb-1'
            onClick={() => {
              if (quantity > 0) setQuantity(quantity - 1);
            }}
          >
            -
          </button>
        </div>
      </div>
      <Input />
      <div className='col-auto p-0 my-auto'>
        <button
          className='btn btn-secondary_blue'
          onClick={() => {
            if (quantity > 0 && size != "default") {
              reduceCartList({
                type: "add",
                number: quantity,
                product: {
                  ...product,
                  size_id,
                  model,
                  size,
                  quantity,
                  weight,
                  stock: currentStock,
                },
              });
              setQuantity(0);
            }
          }}
        >
          <img src='/addtocart.png' height='30px' className='addtocart_icon' />
        </button>
      </div>
    </div>
  );
}

function Details({ product, available }: Props) {
  const [modelValue, setModelValue] = useState(product.inventory[0].model);
  const [quantity, setQuantity] = useState(0);

  const sizesList = () => {
    const model = product.inventory.find(
      (e) => e.model == modelValue
    ) as Inventory;
    const sizeList = model.sizes.filter((e) => e.stock > 0);
    const list = sizeList.map((e) => {
      key2 = key2 + 1;
      return (
        <React.Fragment key={key2}>
          <span className='badge bg-secondary'>{e.size}</span>
          <span> </span>
        </React.Fragment>
      );
    });

    return list;
  };

  const adminActions = () => {
    const token = window.localStorage.getItem("UserSession");
    if (token == null) {
      return <></>;
    }
    return (
      <>
        <Link to={`/edititem/${product._id}`}>
          <button className='m-2'>Editar Producto</button>
        </Link>
        <button onClick={deleteProduct}>Eliminar Producto</button>
      </>
    );
  };

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = window.localStorage.getItem("UserSession");
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://dinokids.site/products/${product._id}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const [selected, setSelected] = useState("default");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value == "default") {
      return;
    }
    setSelected(e.currentTarget.value);
    setModelValue(e.currentTarget.value);
    setQuantity(0);
    console.log(e.currentTarget.value);
  };

  const list = () => {
    const options = product.inventory.map((e, i) => {
      return (
        <option value={e.model} key={i}>
          {e.model}
        </option>
      );
    });
    return options;
  };

  return (
    <div className='col-12 col-sm-9 col-lg-10'>
      <div className='card p-0 mt-2 mb-3 bg-background_blue border-border_blue border-2'>
        <div className='row g-0'>
          <div className='col-12 col-sm-4 p-3'>
            <img
              src={`https://dinokids.site/${product.image}`}
              className='img-fluid rounded-start rounded-end'
            />
          </div>
          <div className='col-12 col-sm-8'>
            <div className='card-body text-start'>
              <h5 className='card-title fw-semibold'>{product.name}</h5>
              <div className='card p-3'>
                <div className='card-body p-0'>
                  <h5>
                    {product.description}{" "}
                    <span className='badge bg-danger'>
                      {modelValue}
                    </span>
                  </h5>
                  <h5>Talles en stock: {sizesList()}</h5>
                  <h5>
                    Marca:{" "}
                    <span className='badge bg-success'>
                      {product.brand}
                    </span>
                  </h5>
                  <h5>
                    Precio:{" "}
                    <span className='badge bg-success'>
                      {product.price}
                    </span>
                  </h5>
                  <select
                    className='form-select fs-5 py-1'
                    value={selected}
                    onChange={handleSelect}
                  >
                    <option className='fs-6' value={"default"}>
                      Seleccione el modelo
                    </option>
                    {list()}
                  </select>
                </div>
              </div>
              <Buttons
                product={product}
                model={modelValue}
                setQuantity={setQuantity}
                quantity={quantity}
              />
            </div>
          </div>
        </div>
      </div>
      {adminActions()}
    </div>
  );
}

export default Details;
