import CartDetail from "../components/cartDetail";
import Navbar from "../components/navbar";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-fb10a3c3-148e-48ae-b4a5-e64ffbe0cccf");

function Checkout() {
  return (
    <div className='App container-fluid p-0 m-0'>
      <Navbar categories={null} />
      <div className='row mx-0 mt-2'>
        <h3 className='fw-normal'>Checkout</h3>
      </div>
      <div className='row m-0'>
        <div className='col-4 px-5 mx-auto'>
          <CartDetail />
        </div>
        <div className='col-3 mx-auto'>
          <h5 className='fw-normal'>Precio:</h5>
          <Wallet initialization={{ preferenceId: "<PREFERENCE_ID>" }} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
