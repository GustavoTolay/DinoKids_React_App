import { useState } from "react";
import { User } from "../types";

type UserLogin = Omit<User, "role">;

function Newform() {

  const [formValues, setFormValues] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type" :  "application/json"
      }
    }
    console.log(JSON.stringify(formValues))
    fetch("https://dinokids.site/auth/login", options)
    .then(res => res.json())
    .then(res => window.localStorage.setItem("UserSession", res.token))
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        target=''
        className='bg-secondary col-3 mx-auto my-5 py-2 rounded'
      >
        <div>
          <label className='form-label'>Email</label>
          <input
            type='email'
            name='email'
            value={formValues.email}
            className='form-control'
            placeholder='name@example.com'
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='form-label'>Contraseña</label>
          <input
            type='password'
            name='password'
            value={formValues.password}
            className='form-control'
            placeholder='password'
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit' className='btn btn-primary mt-2'>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Newform;
