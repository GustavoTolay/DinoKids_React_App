import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { stateList } from "../utils/shipCalculator";
import { Shipment } from "../types";

type Props = {
  hidden?: boolean;
  methods: UseFormReturn<Shipment>;
  onSubmit: SubmitHandler<Shipment>;
  disabled?: boolean
};

function ShippingForm({ hidden, methods, onSubmit, disabled }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const shipment = watch("ship_mode");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-3 text-start'
      hidden={hidden}
    >
      <fieldset disabled={disabled}>
      <h5 className='fw-semibold'>Seleccione su método de envío:</h5>
      <div className='form-check form-check-inline mb-2'>
        <input
          {...register("ship_mode", { required: true })}
          type='radio'
          value='withdraw'
          className='form-check-input border-dark-subtle'
        />
        <label className='form-check-label'>Retiro en Sucursal</label>
      </div>
      <div className='form-check form-check-inline mb-2'>
        <input
          {...register("ship_mode", { required: true })}
          type='radio'
          value='shipping'
          className='form-check-input border-dark-subtle'
        />
        <label className='form-check-label'>Envío a Domicilio</label>
      </div>

      <hr className='mt-1 mb-2' />
      {shipment == "withdraw" ? (
        <div className='card p-0 mb-0'>
          <div className='card-body'>
            <h5 className='card-title fw-semibold text-primary'>
              Nuestra sucursal
            </h5>
            <hr className='m-0' />
            <p className='card-text mt-2 mb-1'>
              S. S. de Jujuy, Necochea 43, Local 2.
            </p>
            <p className='card-text mb-1'>
              Lunes a Viernes de 10:00 a 14:00 y de 18:00 a 22:00.
            </p>
            <p className='card-text'>Sábados de 10:00 a 14:00.</p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <label className='form-label mb-0 mt-2'>Nombre</label>
      <input
        {...register("fullname", { required: true, pattern: /^(?![\s.]+$)[a-zA-Z\s.]*$/ })}
        className={`form-control border-dark-subtle ${errors.fullname && "is-invalid"}`}
      />
      {errors.fullname && <div className="invalid-feedback m-0">{errors.fullname.type == "pattern" ? "Sólo letras y espacios" : "Nombre requerido" }</div>}
      {shipment == "shipping" ? (
        <>
          <label className='form-label mb-0 mt-2'>Provincia</label>
          <select
            {...register("state", { required: true, pattern: /^(?!default$)/ })}
            className={`form-select border-dark-subtle ${errors.state && "is-invalid"}`}
          >
            <option value='default'>Seleccione su Provincia</option>
            {stateList.map((state, i) => {
              return <option value={state} key={i}>{state}</option>;
            })}
          </select>
          {errors.state && <div className="invalid-feedback m-0">{errors.state.type == "pattern" ? "Seleccione una opción" : "Seleccione una provincia"}</div>}

          <label className='form-label mb-0 mt-2'>Localidad</label>
          <input
            {...register("locality", { required: true, pattern: /^[\w\s.]*$/ })}
            className={`form-control border-dark-subtle ${errors.locality && "is-invalid"}`}
          />
          {errors.locality && <div className="invalid-feedback m-0">{errors.locality.type == "pattern" ? "Sin caracteres especiales" : "Localidad requerida" }</div>}
          <label className='form-label mb-0 mt-2'>Calle</label>
          <input
            {...register("street", { required: true, pattern: /^[\w\s.]*$/ })}
            className={`form-control border-dark-subtle ${errors.street && "is-invalid"}`}
          />
          {errors.street && <div className="invalid-feedback m-0">{errors.street.type == "pattern" ? "Sin caracteres especiales" : "Calle requerida" }</div>}
          <label className='form-label mb-0 mt-2'>Número</label>
          <input
            {...register("number", { required: true, pattern: /^[0-9]*$/ })}
            className={`form-control border-dark-subtle ${errors.number && "is-invalid"}`}
          />
          {errors.number && <div className="invalid-feedback m-0">{errors.number.type == "pattern" ? "Sólo números" : "Número requerido" }</div>}
          <label className='form-label mb-0 mt-2'>Departamento (opcional)</label>
          <input
            {...register("apartment", { pattern: /^[\w\s.]*$/ })}
            className={`form-control border-dark-subtle ${errors.apartment && "is-invalid"}`}
          />
          {errors.apartment && <div className="invalid-feedback m-0">{errors.apartment.type == "pattern" && "Sin caracteres especiales"}</div>}
          <label className='form-label mb-0 mt-2'>Piso (opcional)</label>
          <input
            {...register("floor", { pattern: /^[0-9]*$/ })}
            className={`form-control border-dark-subtle ${errors.floor && "is-invalid"}`}
          />
          {errors.floor && <div className="invalid-feedback m-0">{errors.floor.type == "pattern" && "Sin caracteres especiales"}</div>}
          <label className='form-label mb-0 mt-2'>Código Postal</label>
          <input
            {...register("postal_code", { required: true, pattern: /^[0-9]*$/ })}
            className={`form-control border-dark-subtle ${errors.postal_code && "is-invalid"}`}
          />
          {errors.postal_code && <div className="invalid-feedback m-0">{errors.postal_code.type == "pattern" ? "Sólo números" : "Código postal requerido" }</div>}
        </>
      ) : (
        <></>
      )}
      <label className='form-label mb-0 mt-2'>Teléfono (opcional)</label>
      <input
        {...register("phone", { pattern: /^[0-9]*$/ })}
        className={`form-control border-dark-subtle ${errors.phone && "is-invalid"}`}
      />
      {errors.phone && <div className="invalid-feedback m-0">{errors.phone.type == "pattern" && "Solo números"}</div>}
      <label className='form-label mb-0 mt-2'>Email (opcional)</label>
      <input
        {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
        className={`form-control border-dark-subtle ${errors.email && "is-invalid"}`}
      />
      {errors.email && <div className="invalid-feedback m-0">{errors.email.type == "pattern" && "Email inválido"}</div>}
      <label className='form-label mb-0 mt-2'>Observaciones (opcional)</label>
      <textarea
        {...register("observations", { pattern: /^[\w\s.]*$/ })}
        className={`form-control border-dark-subtle ${errors.observations && "is-invalid"}`}
      />
      {errors.observations && <div className="invalid-feedback m-0">{errors.observations.type == "pattern" && "Sin caracteres especiales"}</div>}
      
      <div className='text-center mt-2' hidden={disabled}>
        <input type='submit' value={"Aceptar"} className='btn btn-primary' />
      </div>
      </fieldset>
    </form>
  );
}

export default ShippingForm;
