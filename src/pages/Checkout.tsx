import { useContext, useState } from "react";
import CartDetail from "../components/cartDetail";
import Navbar from "../components/navbar";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CartContext } from "../contexts/cartContext";
import {
  State,
  Weight,
  shipCalculator,
  zoneList,
} from "../hooks/shipCalculator";
import FloatingButton from "../components/floatingButton";
import Footer from "../components/footer";
initMercadoPago("TEST-fb10a3c3-148e-48ae-b4a5-e64ffbe0cccf");

type Item = {
  title: string;
  unit_price: number;
  quantity: number;
};

function Checkout() {
  const { cartList } = useContext(CartContext);
  const states = Object.keys(zoneList);
  let weight = 0;
  let roundedWeight: Weight = 0.5;
  cartList.map((e) => (weight += e.weight * e.quantity));
  const weightList: Weight[] = [5, 3, 2, 1, 0.5];
  weightList.map((e) => {
    if (e > weight) roundedWeight = e;
  });
  const [selected, setSelected] = useState<State | "default">("default");
  const [shipment, setShipment] = useState<string | null>(null);
  const shipPrice = shipCalculator(
    selected as State,
    roundedWeight,
    shipment as "Retiro"
  );
  const orderData: Item[] & { shipments?: {} } = cartList.map((e) => {
    return { title: e.description, quantity: e.quantity, unit_price: e.price };
  });
  let cost = shipPrice;
  if (typeof shipPrice != "number") cost = 0;
  orderData.shipments = {
    cost,
    mode: "not_specified",
  };
  const [preferenceId, setPreferenceId] = useState<string>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isBlocked, setIsBlocked] = useState(false);
  let totalPrice: number = 0;
  cartList.map((e) => {
    totalPrice += e.price * e.quantity;
  });

  const createPreference = () => {
    fetch("https://dinokids.site/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        console.log(preference);
        console.log(preference.id);
        setPreferenceId(preference.id);
        setIsloading(false);
      })
      .catch((error) => {
        console.error(error.json());
      });
  };

  const loadButton = () => {
    if (isLoading && isBlocked)
      return (
        <>
          <br />
          <div className='spinner-border text-primary mt-3' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </>
      );
    if (isLoading || !isBlocked) return <></>;
    return (
      <Wallet
        initialization={{ preferenceId: preferenceId as string }}
        customization={{
          texts: { action: "pay", valueProp: "security_safety" },
        }}
      />
    );
  };

  const Buttons = () => {
    if (isBlocked)
      return (
        <button
          className='btn btn-secondary'
          onClick={() => {
            setIsBlocked(false);
            setIsloading(true);
          }}
        >
          Modificar
        </button>
      );
    return (
      <button
        className='btn btn-primary'
        onClick={() => {
          createPreference();
          setIsBlocked(true);
        }}
      >
        Aceptar
      </button>
    );
  };

  const FormInputs = () => {
    return (
      <>
        <h5>Envío:</h5>
        <input
          type='text'
          className='form-control mb-2'
          value={"Seleccione método de envío:"}
          readOnly
          disabled
        />
        <div className='form-check text-start'>
          <input
            className='form-check-input'
            type='radio'
            disabled={isBlocked}
            checked={shipment == "Retiro"}
            onChange={() => {
              setShipment("Retiro");
              setSelected("default");
            }}
          />
          <label className='form-check-label' htmlFor='flexRadioDefault1'>
            Retiro en Persona
          </label>
        </div>
        <div className='form-check text-start'>
          <input
            className='form-check-input'
            type='radio'
            disabled={isBlocked}
            checked={shipment == "Sucursal"}
            onChange={() => {
              setShipment("Sucursal");
            }}
          />
          <label className='form-check-label' htmlFor='flexRadioDefault2'>
            Envío a Sucursal
          </label>
        </div>
        <div className='form-check text-start'>
          <input
            className='form-check-input'
            type='radio'
            disabled={isBlocked}
            checked={shipment == "Domicilio"}
            onChange={() => {
              setShipment("Domicilio");
            }}
          />
          <label className='form-check-label' htmlFor='flexRadioDefault3'>
            Envío a Domicilio
          </label>
        </div>
        <select
          className='form-select my-2'
          disabled={isBlocked}
          onChange={(e) => {
            setSelected(e.currentTarget.value as State);
          }}
          value={selected}
        >
          <option value='default'>Seleccione Provincia o Localidad</option>
          {states.map((e, i) => {
            return (
              <option value={e} key={i}>
                {e}
              </option>
            );
          })}
        </select>
        <h5 className='fw-semibold'>
          Envío: <span className='fw-normal'>${shipPrice || "-"}</span>
        </h5>
        <h5 className='fw-semibold'>
          Total: <span className='fw-normal'>${totalPrice}</span>
        </h5>
        <Buttons />
      </>
    );
  };

  return (
    <div className='App container-fluid p-0 m-0'>
      <Navbar categories={null} />
      <div className='row mx-0 mt-2'>
        <h4 className='mt-2'>Finalizar Compra</h4>
      </div>
      <div className='row m-0 mb-5'>
        <div className='col-sm-6 col-lg-6 col-xl-4 col-12 px-lg-5  mx-auto'>
          <h5>Detalle:</h5>
          <CartDetail isCheckout />
        </div>
        <div className='col-sm-6 col-lg-4 col-xl-3 col-12 mx-sm-auto px-sm-2 px-5'>
          <FormInputs />
          {loadButton()}
        </div>
      </div>
      <div className="row m-0">
        <Footer />
      </div>
      <FloatingButton />
    </div>
  );
}

export default Checkout;
