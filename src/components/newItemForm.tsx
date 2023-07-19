import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { Product } from "../types";
import React, { useState } from "react";

type Props = {
  modelIndex: number;
  control: Control<Product, any>;
  register: UseFormRegister<Product>;
};

function SizeList({ modelIndex, control, register }: Props) {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `inventory.${modelIndex}.sizes`,
  });

  function fieldList() {
    const list = fields.map((field, index) => {
      return (
        <React.Fragment key={field.id}>
          <div className='row align-items-center text-center mt-1'>
            <div className='col-4'>
              <label className='col-form-label m-0'>
                Talle {(index + 1).toString()}
              </label>
            </div>
            <div className='col-8'>
              <input
                type='text'
                className='form-control'
                {...register(`inventory.${modelIndex}.sizes.${index}.size`)}
              />
            </div>
          </div>
          <div className='row align-items-center text-center mt-1'>
            <div className='col-4'>
              <label className='col-form-label m-0'>
                Stock {(index + 1).toString()}
              </label>
            </div>
            <div className='col-8'>
              <input
                type='number'
                className='form-control'
                {...register(`inventory.${modelIndex}.sizes.${index}.stock`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className='row align-items-center text-center mt-1'>
            <div className='col-4'>
              <label className='col-form-label m-0'>
                Peso {(index + 1).toString()}
              </label>
            </div>
            <div className='col-8'>
              <input
                type='number'
                className='form-control'
                {...register(`inventory.${modelIndex}.sizes.${index}.weight`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className='text-center mt-2'>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => remove(index)}
            >
              Eliminar Talle
            </button>
          </div>
        </React.Fragment>
      );
    });
    return list;
  }

  return (
    <div>
      {fieldList()}
      <div className='text-center mt-2'>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => append({ size: "", stock: 0, weight: 0 })}
        >
          Agregar Talle
        </button>
      </div>
    </div>
  );
}

export default function NewItemForm() {
  const { register, handleSubmit, control } = useForm<Product>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventory",
  });

  const [image, setImage] = useState<File>();

  const onSubmit: SubmitHandler<Product> = (form) => {
    console.log(form)
    setLoading(true);
    const token = window.localStorage.getItem("UserSession");
    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("product", JSON.stringify(form))
    const options: RequestInit = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("https://dinokids.site/products", options)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
      });
  };

  const [loading, setLoading] = useState(true);

  function modelsList() {
    const list = fields.map((field, index) => {
      return (
        <React.Fragment key={field.id}>
          <label className='form-label m-0'>
            Modelo {(index + 1).toString()}
          </label>
          <input
            type='text'
            className='form-control'
            {...register(`inventory.${index}.model`)}
          />
          <SizeList modelIndex={index} control={control} register={register} />
          <div className='text-center mt-2'>
            <button
              className='btn btn-dark btn-sm'
              onClick={() => remove(index)}
            >
              Eliminar Modelo
            </button>
          </div>
        </React.Fragment>
      );
    });
    return list;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-4 text-start px-5'>
            <div>
              <label className='form-label m-0 mt-2'>Nombre</label>
              <input
                type='text'
                className='form-control'
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label className='form-label m-0 mt-2'>Descripción</label>
              <input
                type='text'
                className='form-control'
                {...register("description", { required: true })}
              />
            </div>
            <div>
              <label className='form-label m-0 mt-2'>Categoria</label>
              <input
                type='text'
                className='form-control'
                {...register("category", { required: true })}
              />
            </div>
            <div>
              <label className='form-label m-0 mt-2'>Precio</label>
              <input
                type='number'
                className='form-control'
                {...register("price", { required: true, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className='form-label m-0 mt-2'>Marca</label>
              <input
                type='text'
                className='form-control'
                {...register("brand", { required: true })}
              />
            </div>
            <div className='align-items-center mt-2'>
              <label className='form-label'>Disponible?</label>
              <input
                type='checkbox'
                className='form-check-input ms-2'
                {...register("available")}
              />
            </div>
            <div className='text-center mt-2'>
              <input type='submit' className='btn btn-danger' />
            </div>
          </div>
          <div className='col-4 text-start px-5'>
            {modelsList()}
            <div className='text-center mt-2'>
              <button
                className='btn btn-primary'
                onClick={() =>
                  append({
                    model: "",
                    sizes: [],
                  })
                }
              >
                Agregar Modelo.
              </button>
            </div>
          </div>
          <div className='col-4 px-5'>
            <div className='row'>
              <h5>Agregar Imagen</h5>
              <p>De preferencia en proporción 1:1 (cuadrada pues).</p>
              <div className='mb-3'>
                <input
                  className='form-control'
                  type='file'
                  name='image'
                  onChange={(e) => {
                    if (e.target.files) setImage(e.target.files[0]);
                  }}
                />
              </div>
              <hr />
            </div>
            <div className='row'>
              <h5>Feedback (Retroali...)</h5>
              <div
                className='spinner-border text-primary mx-auto mt-2'
                role='status'
                hidden={loading}
              >
                <span className='visually-hidden'>Loading...</span>
              </div>
              <h4 className='text-primary mt-2' hidden={!loading}>Hecho!, espero</h4>
            </div>
          </div>
        </div>
      </form>
      <div className='col-6'></div>
    </>
  );
}
