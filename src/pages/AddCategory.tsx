import { useState } from "react";
import Navbar from "../components/navbar";
import { category } from "../types";

const Creator = () => {
  const [formValues, setFormValues] = useState<category>({
    available: true,
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      available: !formValues.available,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = window.localStorage.getItem("UserSession")
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    console.log(JSON.stringify(formValues));
    fetch("https://dinokids.site/categories", options)
      .then((res) => console.log(res));
  };

  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null}/>
        <div className='row mx-0 mt-5'>
          <h3>Agregar Categoria</h3>
        </div>
        <div className='row m-0 mt-2'>
          <div className="col-4"></div>
          <div className='col-4'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='name'
                value={formValues.name}
                onChange={handleChange}
                className='form-control'
                placeholder='name'
              />
              <label>
                Disponible{" "}
                <input
                  type='checkbox'
                  name='available'
                  checked={formValues.available}
                  onChange={handleClick}
                  className='form-check-input'
                  placeholder='available'
                />
              </label>
              <button type='submit' className='btn btn-info m-2'>
                Añadir
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creator;
