import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { NewProduct, Product } from "../../types";
import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { postProduct, putProduct } from "../../services/products";
import { UseAlert } from "../../hooks/useAlert";

type SizeListProps = {
  modelIndex: number;
  control: Control<Product | NewProduct, any>;
  register: UseFormRegister<Product | NewProduct>;
  hideButtons: boolean;
};

function SizeList({
  modelIndex,
  control,
  register,
  hideButtons,
}: SizeListProps) {
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
              hidden={hideButtons}
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
          type='button'
          className='btn btn-sm btn-primary'
          onClick={() => append({ size: "", stock: 0, weight: 0 })}
          hidden={hideButtons}
        >
          Agregar Talle
        </button>
      </div>
    </div>
  );
}

type Props = {
  alert: UseAlert;
  product?: Product;
  inCreateMode?: boolean;
};

export default function ItemForm({
  alert,
  product,
  inCreateMode = !product,
}: Props) {
  // Set form values if there's a product
  function setDefaultValues() {
    if (product) {
      const { _id, ...formValues } = product;
      return formValues;
    }
    return;
  }

  const { register, handleSubmit, control } = useForm<Product | NewProduct>({
    defaultValues: setDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventory",
  });

  const [image, setImage] = useState<File>();
  const [imageURL, setImageURL] = useState("#");

  const token = useLocalStorage("UserSession");

  const onSubmit: SubmitHandler<Product | NewProduct> = (form) => {
    function sendRequest() {
      if (inCreateMode) {
        return postProduct(form, token.get() as string, image);
      } else {
        let { inventory, ...newProduct } = form as Product;
        newProduct._id = product?._id as string;
        return putProduct(newProduct, token.get() as string);
      }
    }

    sendRequest().then((res) => {
      if (res?.status == 200)
        return alert.set({ color: "primary", message: "Operación exitosa" });
      return alert.set({ color: "danger", message: "Error en la petición" });
    });
  };

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
          <SizeList
            modelIndex={index}
            control={control}
            register={register}
            hideButtons={!inCreateMode}
          />
          <div className='text-center mt-2'>
            <button
              type='button'
              className='btn btn-dark btn-sm'
              onClick={() => remove(index)}
              hidden={!inCreateMode}
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
      <form className='row' onSubmit={handleSubmit(onSubmit)}>
        {/* main-information-form section */}
        <section className='col-4 text-start px-5'>
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
        </section>

        {/* Set models and sizes section */}
        <section className='col-4 text-start px-5'>
          <fieldset disabled={!inCreateMode}>{modelsList()}</fieldset>
          <div className='text-center mt-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() =>
                append({
                  model: "",
                  sizes: [],
                })
              }
              hidden={!inCreateMode}
            >
              Agregar Modelo.
            </button>
          </div>
        </section>

        {/* Image upload and preview section */}
        <section className='col-4 px-5'>
          <div className='row' hidden={!inCreateMode}>
            <h5>Agregar Imagen</h5>
            <p>Proporción 1:1.</p>
            <img src={imageURL} alt='Image preview' />
            <div className='mb-3'>
              <input
                className='form-control'
                type='file'
                name='image'
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setImageURL(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
