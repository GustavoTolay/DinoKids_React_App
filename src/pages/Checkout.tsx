import { useContext, useState } from "react";
import CartDetail from "../components/cartDetail";
import Navbar from "../components/navbar";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CartContext } from "../contexts/cartContext";
import {
  shipCalculator,
} from "../utils/shipCalculator";
import FloatingButton from "../components/floatingButton";

import configMP from "../utils/configMP"
initMercadoPago(configMP.publicKey);
import { Product, Shipment } from "../types";
import ShippingForm from "../components/shippingForm";
import { useForm, SubmitHandler } from "react-hook-form";

type Item = {
  title: string;
  unit_price: number;
  quantity: number;
};

type PreferenceRequest = {
  items: Item[];
  shipments?: {
    cost: number,
    mode: "not_specified"
  }
}

function Checkout() {
  const { cartList, cartPrice, cartWeight } = useContext(CartContext);
  
  const itemsList: Item[] = cartList.map((e) => {
    return { title: e.description, quantity: e.quantity, unit_price: e.price };
  });
  
  const [preferenceId, setPreferenceId] = useState<string>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [sufficientStock, setSufficientStock] = useState<boolean>();

  const [confirmed, setConfirmed] = useState(false);

  const verifyStock = () => {
    const idList = cartList.map(({ _id }) => {
      return { _id };
    });
    fetch("https://dinokids.site/products/stock", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idList),
    })
      .then((res) => {
        if (res.status == 404) return null;
        return res.json();
      })
      .then((stockList: Product[] | null) => {
        if (!stockList) return;
        const stock = cartList.map((product) => {
          const current = stockList.find((e) => e._id == product._id);
          const model = current?.inventary.find(
            (e) => e.model == product.model
          );
          const size = model?.sizes.find((e) => e.size == product.size);
          return (size?.stock as number) >= product.quantity;
        });
        setSufficientStock(!stock.includes(false));
      })
      .catch((error) => {
        console.error(error.json());
      });
  };

  const formMethods = useForm<Shipment>({
    defaultValues: { ship_mode: "withdraw" },
  });

  const state = formMethods.watch("state");
  const shipMode = formMethods.watch("ship_mode");
  console.log({ state, shipMode });
  const shipPrice = shipCalculator(0.5, state as "default", shipMode);

  const orderData: PreferenceRequest = {
    items: itemsList,
    shipments: {
      cost: shipPrice,
      mode: "not_specified",
    }
  };

  const createPreference = () => {
    console.log(orderData);
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
    if (isLoading && confirmed)
      return (
        <>
          <br />
          <div className='spinner-border text-primary mt-3' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </>
      );
    if (isLoading || !confirmed) return <></>;
    return (
      <Wallet
        initialization={{ preferenceId: preferenceId as string }}
        customization={{
          texts: { action: "pay", valueProp: "security_safety" },
        }}
      />
    );
  };

  const [content, setContent] = useState<"detalle" | "envio" | "pago">(
    "detalle"
  );

  const navList = () => {
    return (
      <>
        <li
          className='nav-item'
          value={"detalle"}
          onClick={() => {
            if (!blockedTabs) setContent("detalle");
          }}
        >
          <a
            className={`nav-link ${content == "detalle" && "active"} ${
              blockedTabs && "disabled"
            }`}
            href='#'
          >
            Detalle
          </a>
        </li>
        <li
          className='nav-item'
          value={"envio"}
          onClick={() => {
            if (!blockedTabs) setContent("envio");
          }}
        >
          <a
            className={`nav-link ${content == "envio" && "active"} ${
              blockedTabs && "disabled"
            }`}
            href='#'
          >
            Info. de Envío
          </a>
        </li>
        <li
          className='nav-item'
          value={"pago"}
          onClick={() => {
            if (disabledForm) {
              setContent("pago");
              setBlockCart(true);
            }
          }}
        >
          <a
            className={`nav-link ${content == "pago" && "active"} ${
              (!disabledForm || blockedTabs) && "disabled"
            }`}
            href='#'
          >
            Pago
          </a>
        </li>
      </>
    );
  };
  
  // const [shipPrice] = useState(shipCalculator(0.5, state as "default", shipMode)) 
  const totalPrice = cartPrice + shipPrice;

  const [disabledForm, setDisabledForm] = useState(false);
  const onSubmit: SubmitHandler<Shipment> = (data) => {
    setContent("pago");
    console.log(data);
    setDisabledForm(true);
    setBlockCart(true);
  };
  const [blockCart, setBlockCart] = useState(false);
  const [blockedTabs, setBlockedTabs] = useState(false);

  return (
    <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
      <Navbar categories={null} hideCart />
      <div className='row m-0 flex-grow-1'>
        <div className='row m-0 mb-5 checkout_main mt-3'>
          <ul className='nav nav-tabs justify-content-center'>{navList()}</ul>
          <div className='col-sm-6 col-lg-6 col-xl-4 col-12 px-lg-5 h-100 mx-auto'>
            {content == "detalle" && (
              <>
                <h5 className='text-start fw-semibold mt-3'>Detalle:</h5>
                <CartDetail hideButtons={blockCart} />
                <hr className='m-0 mt-2' />
                <div className='row'>
                  <h5 className='text-start fw-semibold mt-3 col-7'>
                    Total: ${cartPrice}
                  </h5>
                  <div className='col-5 my-auto'>
                    <button
                      className='btn btn-primary mt-auto'
                      hidden={blockCart}
                      onClick={() => {
                        setContent("envio");
                        setBlockCart(true);
                      }}
                    >
                      Aceptar
                    </button>
                    <button
                      className='btn btn-danger mt-auto'
                      hidden={!blockCart}
                      onClick={() => {
                        setBlockCart(false);
                      }}
                    >
                      Modificar
                    </button>
                  </div>
                </div>
              </>
            )}
            <ShippingForm
              hidden={content !== "envio"}
              methods={formMethods}
              onSubmit={onSubmit}
              disabled={disabledForm}
            />
            <div
              className='text-center mt-2'
              hidden={!disabledForm || content !== "envio"}
            >
              <button
                className='btn btn-danger'
                onClick={() => {
                  setDisabledForm(false);
                }}
              >
                Modificar
              </button>
            </div>
            {content == "pago" && (
              <>
                <div className='text-start'>
                  <h5 className='fw-semibold mt-3'>Realizar pago:</h5>
                  <div className='card p-3'>
                    <div className='card-body'>
                      <h4 className='card-title m-0'>Resumen</h4>
                      <h6 className='cart-subtitle text-primary fw-semibold mb-4'>
                        {shipMode == "shipping"
                          ? "Envío a Domicilio"
                          : "Retiro en Sucursal"}
                      </h6>
                      <div className='card-text row'>
                        <p className='col-8'>Carrito:</p>
                        <p className='col-4'>${cartPrice}</p>
                      </div>
                      <div className='card-text row'>
                        <p className='col-8'>Envío:</p>
                        <p className='col-4'>${shipPrice}</p>
                      </div>
                      <hr className='m-0 mb-2' />
                      <div className='card-text row'>
                        <p className='col-8 m-0'>Total:</p>
                        <p className='col-4 m-0'>${totalPrice}</p>
                      </div>
                    </div>
                  </div>
                  <div className='text-center'>
                    <button
                      className='btn btn-primary mt-2'
                      hidden={confirmed}
                      onClick={() => {
                        if (disabledForm && blockCart) {
                          setConfirmed(true);
                          setBlockedTabs(true);
                          setIsloading(true)
                          createPreference();
                        }
                      }}
                    >
                      Aceptar
                    </button>
                    <button
                      className='btn btn-danger mt-2'
                      hidden={!confirmed}
                      onClick={() => {
                        setBlockedTabs(false);
                        setConfirmed(false);
                      }}
                    >
                      Modificar
                    </button>
                    {loadButton()}
                  </div>
                </div>

                {/* <FormInputs />
                {loadButton()} */}
              </>
            )}
          </div>
          {/*<div className='col-sm-6 col-lg-4 col-xl-3 col-12 mx-sm-auto px-sm-2 px-5'>
            
          </div>*/}
        </div>
      </div>

      <FloatingButton />
    </div>
  );
}

export default Checkout;
