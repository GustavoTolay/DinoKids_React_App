import { useState } from "react";
import { Product, inventary } from "../types";
import React from "react";
type Props = {
  product: Product | undefined;
};

const Itemform = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [modelValues, setModelValues] = useState<inventary[]>(() => {
    if (!props.product) {
      return [];
    }
    return props.product.inventary;
  });
  const [productValues, setProductValues] = useState<Product>(() => {
    if (!props.product) {
      return {
        _id: "",
        available: true,
        brand: "",
        category: "category1",
        description: "",
        image: "",
        inventary: [],
        price: 0,
        name: "",
      };
    }
    return props.product;
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductValues({
      ...productValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    console.log(productValues);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductValues({
      ...productValues,
      available: !productValues.available,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const setImageInput = () => {
    if (!props.product) {
      return (
        <div>
          <input
            type='file'
            name='image'
            className='form-control mb-2'
            placeholder='image'
            onChange={handleImage}
          />
        </div>
      );
    }
    return <></>;
  };

  const addModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModelValues([
      ...modelValues,
      {
        model: "",
        sizes: [
          {
            size: "",
            stock: 0,
            weight: 0
          },
        ],
      },
    ]);
  };

  const removeModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = parseInt(e.currentTarget.id);
    const mimic = modelValues;
    delete mimic[index];
    setModelValues(
      mimic.filter((e) => {
        return e != null;
      })
    );
  };

  const addSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = parseInt(e.currentTarget.id);
    let data = [...modelValues];
    data[index].sizes.push({
      size: "",
      stock: 0,
      weight: 0
    });
    setModelValues(data);
  };

  const removeSize = (
    e: React.MouseEvent<HTMLButtonElement>,
    elementIndex: number,
    sizeIndex: number
  ) => {
    e.preventDefault();
    let data = [...modelValues];
    delete data[elementIndex].sizes[sizeIndex];
    data[elementIndex].sizes = data[elementIndex].sizes.filter((e) => {
      return e != null;
    });
    setModelValues(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let data = [...modelValues];
    data[index][e.currentTarget.name as "model"] = e.currentTarget.value;
    setModelValues(data);
  };

  const sizeList = (element: inventary, elementIndex: number) => {
    const list = element.sizes.map((e, index) => {
      return (
        <React.Fragment key={index}>
          <input
            type='text'
            className='form-control mb-2'
            placeholder='size'
            name='size'
            value={e.size}
            onChange={(evt) => handleSizeChange(evt, index, elementIndex)}
          ></input>
          <input
            type='text'
            className='form-control'
            placeholder='stock'
            name='stock'
            value={e.stock}
            onChange={(evt) => handleSizeChange(evt, index, elementIndex)}
          ></input>
          <input type="text" className="form-control mb-2" placeholder="weight" name="weight" value={e.weight} onChange={(evt) => handleSizeChange(evt, index, elementIndex)} />
          <button
            onClick={(evt) => removeSize(evt, elementIndex, index)}
            className='m-2 btn btn-danger'
          >
            Quitar talla
          </button>
        </React.Fragment>
      );
    });
    return list;
  };

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sizeIndex: number,
    elementIndex: number
  ) => {
    let data = [...modelValues];
    data[elementIndex].sizes[sizeIndex][e.currentTarget.name as "size"] =
      e.currentTarget.value;
    setModelValues(data);
  };

  const modelList = () => {
    const list = modelValues.map((e, i) => {
      return (
        <React.Fragment key={i}>
          <input
            type='text'
            className='form-control mb-2'
            placeholder='model'
            name='model'
            onChange={(evt) => handleChange(evt, i)}
            value={e.model}
          ></input>
          {sizeList(e, i)}
          <button
            onClick={removeModel}
            id={i.toString()}
            className='m-2 btn btn-danger'
          >
            Quitar modelo
          </button>
          <button
            onClick={addSize}
            id={i.toString()}
            className='btn btn-danger'
          >
            Agregar talla
          </button>
        </React.Fragment>
      );
    });
    return list;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = window.localStorage.getItem("UserSession");
    const info = productValues;
    info.inventary = modelValues;
    const formData = new FormData()
    if(!props.product) formData.append("image", selectedFile as Blob);
    formData.append("product", JSON.stringify(info))
    const method = () => {
      if(!props.product) return "POST"
      return "PUT"
    }
    const options: RequestInit = {
      method: method(),
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(JSON.stringify(new FormData(e.currentTarget)))
    fetch("https://dinokids.site/products", options).then((res) =>
      console.log(res)
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-6'>
            <div>
              <input
                type='text'
                name='name'
                className='form-control mb-2'
                placeholder='name'
                value={productValues.name}
                onChange={handleForm}
              />
            </div>
            <div>
              <input
                type='text'
                className='form-control mb-2'
                placeholder='description'
                name='description'
                value={productValues.description}
                onChange={handleForm}
              />
            </div>
            <div>
              <input
                type='number'
                name='price'
                className='form-control mb-2'
                placeholder='price'
                value={productValues.price}
                onChange={handleForm}
              />
            </div>
            <div>
              <input
                type='text'
                name='brand'
                className='form-control mb-2'
                placeholder='brand'
                value={productValues.brand}
                onChange={handleForm}
              />
            </div>
            {setImageInput()}
            <div>
              <label>
                <input
                  type='checkbox'
                  className='form-check-input mb-2'
                  placeholder='available'
                  name='available'
                  onChange={handleClick}
                  checked={productValues.available}
                />{" "}
                Available
              </label>
            </div>
            <div>
              <input
                type='text'
                className='form-control mb-2'
                placeholder='category'
                value={productValues.category}
                name='category'
                onChange={handleForm}
              />
            </div>
          </div>
          <div className='col-6'>
            {modelList()}
            <div>
              <button className='m-2 btn btn-info' onClick={addModel}>
                Agregar Modelo
              </button>
            </div>
          </div>
        </div>
        <button type='submit'>Agregar Producto</button>
      </form>
    </>
  );
};

export default Itemform;
