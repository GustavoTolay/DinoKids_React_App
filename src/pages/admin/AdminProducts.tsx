import { useEffect, useState } from "react";
import ProductsList from "../../components/admin/ProductsList";
import Navbar from "../../components/navbar";
import { Product } from "../../types";
import ShowAlert from "../../components/admin/ShowAlert";
import useAlert from "../../hooks/useAlert";

export default function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const alert = useAlert();

  useEffect(() => {
    fetch("https://dinokids.site/products")
      .then((res) => res.json() as Promise<Product[]>)
      .then((products) => {
        setProductsList(products);
        console.log(products);
      });
  }, []);

  const loadProducts = () => {
    if (productsList.length)
      return <ProductsList products={productsList} alert={alert}></ProductsList>;
    return <></>;
  };

  return (
    <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
      <Navbar categories={null}></Navbar>
      {loadProducts()}
      <ShowAlert alert={alert}></ShowAlert>
    </div>
  );
}
