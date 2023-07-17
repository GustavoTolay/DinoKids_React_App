import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Details from "../components/details";
import Mininav from "../components/mininav";
import { Category, Product } from "../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FloatingButton from "../components/floatingButton";

function Products() {
  const { id } = useParams();

  const [productValues, setProductValues] = useState<Product>();
  const [categoriesValues, setCategoriesValues] = useState<Category[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dinokids.site/products/${id}`)
      .then((res) => res.json() as Promise<Product>)
      .then((product) => {
        console.log(product);
        setProductValues(product);
        setIsProductLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`https://dinokids.site/categories`)
      .then((res) => res.json() as Promise<Category[]>)
      .then((categories) => {
        console.log(categories);
        setCategoriesValues(categories);
        setIsSidebarLoading(false);
      });
  }, []);

  return (
    <>
      <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
        <Navbar categories={categoriesValues} />
        <Mininav />
        <div className='row m-0 flex-grow-1'>
          {isSidebarLoading ? <div className="col-3 col-lg-2 d-none d-sm-block"></div> : <Sidebar categories={categoriesValues} />}
          {isProductLoading ? <></> : <Details product={productValues as Product} available />}
        </div>
        <FloatingButton />
      </div>
    </>
  );
}

export default Products;
