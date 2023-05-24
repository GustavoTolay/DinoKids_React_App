import { Link } from "react-router-dom";
import types, { inventary } from "../types";
import "./product.css";
import React, { useState } from "react";

interface Props {
  product: types.Product;
  available: "yes" | "no";
}

var key2 = 0;

function Product({ product, available }: Props) {
  const [modelValue, setModelValue] = useState(product.inventary[0].model);

  const sizesList = () => {
    const model = product.inventary.find(
      (e) => e.model == modelValue
    ) as inventary;
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
    fetch(`http://localhost:3000/products/${product._id}`, options)
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
    console.log(e.currentTarget.value);
  };

  const list = () => {
    const options = product.inventary.map((e, i) => {
      return <option value={e.model} key={i}>{e.model}</option>;
    });
    return options;
  };

  return (
    <div className='col-12 col-sm-9 col-lg-10'>
      <div className='card product-body p-0 mt-2'>
        <div className='row g-0'>
          <div className='col-12 col-sm-4 img-div my-2 mx-auto m-sm-2'>
            <img
              src={`https://dinokids.site/${product.image}`}
              className='img-fluid rounded-start rounded-end p-0 perejil'
            />
          </div>
          <div className='col-12 col-sm-8'>
            <div className='card-body'>
              <h5 className='card-title li-item'>{product.name}</h5>

              <ul className='list-group'>
                <li className='list-group-item py-1 li-item'>
                  <h5 className='m-0'>
                    {product.description}{" "}
                    <span className='badge bg-danger fw-semibold'>
                      {modelValue}
                    </span>
                  </h5>
                </li>
                <li className='list-group-item py-1 li-item'>
                  <h5 className='m-0 fw-normal'>
                    Talles en stock: {sizesList()}
                  </h5>
                </li>
                <li className='list-group-item py-1 li-item'>
                  <h5 className='m-0 fw-normal'>
                    Marca:{" "}
                    <span className='badge bg-success fw-semibold fs-6'>
                      {product.brand}
                    </span>
                  </h5>
                </li>
                <li className='list-group-item py-1 li-item'>
                  <h5 className='m-0 fw-normal'>
                    Precio:{" "}
                    <span className='badge bg-success fw-semibold fs-6'>
                      {product.price}
                    </span>
                  </h5>
                </li>
                <select
                  className='list-group-item fs-5 py-1 li-select'
                  value={selected}
                  onChange={handleSelect}
                >
                  <option className='fs-6' value={"default"}>
                    Seleccione el modelo
                  </option>
                  {list()}
                </select>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {adminActions()}
    </div>
  );
}

export default Product;
