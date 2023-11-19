import { Link } from "react-router-dom";
import { UseAlert } from "../../hooks/useAlert";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { deleteProduct } from "../../services/products";
import { Product } from "../../types";

type Props = {
  products: Product[];
  alert: UseAlert;
};

export default function ProductsList({ products, alert }: Props) {

  const token = useLocalStorage("UserSession");

  const handleDelete = (product: Product) => {
    deleteProduct(product._id, token.get() as string).then((res) => {
      if (!res)
        return alert.set({ color: "danger", message: "Error en la petición" });
      if (res.status == 200)
        return alert.set({ color: "primary", message: "Producto eliminado" });
    });
  };

  return (
    <div className='row row-cols-6 g-2 m-0'>
      <div className='card text-start p-4'>
        <div className='card-body p-0'>
          <h5 className='card-title fw-light m-0'>Acciones:</h5>
          <hr className='mt-0' />
          <div className='card-text'>
            <button className='btn btn-primary btn-sm mb-2'>
              &#x2795; Agregar Producto
            </button>
            <button className='btn btn-primary btn-sm mb-2'>
              &#x2795; Agregar Categoria
            </button>
          </div>
        </div>
        <div className='card-footer'></div>
      </div>
      {products.map((product, index) => {
        return (
          <div className='card text-start p-2' key={index}>
            <div className='card-body py-0 px-1'>
              <p className='card-title'>{product.name}</p>
              <div className='card-text'>
                <div className='d-flex justify-content-between'>
                  <p className='m-0 text-primary'>categoria:</p>
                  <p className='m-0'>{product.category}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='m-0 text-primary'>disponible:</p>
                  <p className='m-0'>{product.available ? "Si" : "No"}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='m-0 text-primary'>marca:</p>
                  <p className='m-0'>{product.brand.toString()}</p>
                </div>
                <div className=''>
                  <p className='m-0 text-primary'>descripción:</p>
                  <p className='m-0'>{product.description}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='m-0 text-primary'>precio:</p>
                  <p className='m-0'>${product.price}</p>
                </div>
              </div>
            </div>
            <div className='card-footer pb-0'>
              <div className='d-flex justify-content-between'>
                <Link to={"#"}><button className='btn btn-primary'>&#9997;</button></Link>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(product)}
                >
                  &#128465;
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
