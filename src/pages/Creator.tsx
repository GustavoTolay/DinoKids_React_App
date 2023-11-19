import Navbar from "../components/navbar";
import ItemForm from "../components/admin/ItemForm";
import useAlert from "../hooks/useAlert";
import ShowAlert from "../components/admin/ShowAlert";
import { Product } from "../types";
import { useLocation } from "react-router-dom";

const Creator = () => {
  const location = useLocation();
  const { product }: { product?: Product } = location.state;
  const alert = useAlert();

  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null} />
        <div className='row mx-0 mt-3'>
          <h4 className='fw-semibold'>Agregar Producto</h4>
        </div>
        <div className='row m-0'>
          <ItemForm alert={alert} product={product} />
          <ShowAlert alert={alert}></ShowAlert>
        </div>
      </div>
    </>
  );
};

export default Creator;
