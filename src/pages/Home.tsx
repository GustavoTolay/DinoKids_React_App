import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import List from "../components/list";
import Mininav from "../components/mininav";
import { useContext, useEffect, useState } from "react";
import { Product, Category } from "../types";
import FloatingButton from "../components/floatingButton";
import { ContentContext } from "../contexts/contentContext";

function Home() {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);

  const { filters } = useContext(ContentContext);

  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      return filters.category == "all" || product.category == filters.category;
    });
  };

  useEffect(() => {
    fetch("https://dinokids.site/categories")
      .then((res) => res.json() as Promise<Category[]>)
      .then((list) => {
        console.log(list);
        setCategories(list);
        setLoadingCategories(false);
      });
  }, []);

  const filteredProducts = filterProducts(productsList);

  useEffect(() => {
    fetch("https://dinokids.site/products")
      .then((res) => res.json() as Promise<Product[]>)
      .then((products) => {
        console.log(products);
        setProductsList(products);
        setLoadingProducts(false);
      });
  }, []);

  const loadPage = () => {
    if (!loadingCategories && !loadingProducts) {
      return (
        <>
          <div className='row m-0 flex-grow-1'>
            <Sidebar categories={categories} />
            <List products={filteredProducts} />
          </div>
        </>
      );
    }
    return <></>;
  };

  return (
    <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
      <Navbar categories={categories} />
      <Mininav></Mininav>
      {loadPage()}
      <FloatingButton />
    </div>
  );
}

export default Home;
