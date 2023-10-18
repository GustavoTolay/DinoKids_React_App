import { useState } from "react";
import { User } from "../types";
import { UseAlert } from "../hooks/useAlert";
import { useLocalStorage } from "../hooks/useLocalStorage";

type UserLogin = Omit<User, "role">;

type Props = {
  alert: UseAlert;
};

function Newform({ alert }: Props) {
  const token = useLocalStorage("UserSession");
  const expireSession = useLocalStorage("SessionExpiresIn");

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
        "Content-Type": "application/json",
      },
    };
    console.log(JSON.stringify(formValues));
    fetch("https://dinokids.site/auth/login", options)
      .then((res) => {
        if (res.status == 200)
          alert.set({ color: "primary", message: "Operación exitosa :v" });
        else alert.set({ color: "danger", message: "Error crítico :'v" });
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        token.set(res.token);
        expireSession.set(Date.now() + 1000 * 60 * 60);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        target=''
        className='col-3 mx-auto my-5 py-2 rounded border border-primary text-start'
      >
        <div>
          <label className='form-label mb-0 mt-3'>Email:</label>
          <input
            type='email'
            name='email'
            value={formValues.email}
            className='form-control'
            placeholder='nombre@ejemplo.com'
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='form-label mb-0 mt-3'>Contraseña:</label>
          <input
            type='password'
            name='password'
            value={formValues.password}
            className='form-control'
            placeholder='contraseña'
            onChange={handleChange}
          />
        </div>
        <div className='text-center'>
          <button type='submit' className='btn btn-primary mt-3 fw-normal'>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </>
  );
}

export default Newform;
