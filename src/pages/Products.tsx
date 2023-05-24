import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Product from "../components/product";
import Mininav from "../components/mininav";
import types, { category } from "../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface ProductState {
  inputValues: types.Product;
}

const product: types.Product = {
  _id: "hola",
  name: "hola",
  image: "hola",
  price: 12,
  available: false,
  category: "",
  inventary: [
    // {
    // model: "Color1",
    // sizes: [{
    // size: "T1",
    // stock: 0
    // }]
    // }
  ],
  brand: "",
  description: "",
};

// const categories: types.category[] = [
//   "category1",
//   "category2",
//   "category3",
//   "category4",
// ];

function Products() {
  const { id } = useParams();

  const [productValues, setProductValues] =
    useState<ProductState["inputValues"]>(product);
  const [categoriesValues, setCategoriesValues] = useState<category[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isSidebarLoading, setIsSidebarLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dinokids.site/products/${id}`)
      .then((res) => res.json() as Promise<types.Product>)
      .then((product) => {
        console.log(product);
        setProductValues(product);
        setIsProductLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`https://dinokids.site/categories`)
      .then((res) => res.json() as Promise<types.category[]>)
      .then((categories) => {
        console.log(categories);
        setCategoriesValues(categories);
        setIsSidebarLoading(false);
      });
  }, []);

  const loadPage = () => {
    if (!isProductLoading && !isSidebarLoading) {
      return (
        <>
          <Sidebar categories={categoriesValues} />
          <Product product={productValues} available='yes' />
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={categoriesValues}/>
        <Mininav
          product={productValues.name}
          category={productValues.category}
        />
        <div className='row m-0'>{loadPage()}</div>
      </div>
    </>
  );
}

export default Products;
