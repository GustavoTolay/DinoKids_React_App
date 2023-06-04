import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import List from "../components/list";
import Mininav from "../components/mininav";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Product, category } from "../types";
import { useParams } from "react-router-dom";
import FloatingButton from "../components/floatingButton";

const products: Product[] = [
  {
    _id: "hola",
    name: "hola",
    image: "remera.jpg",
    price: 12,
    available: false,
    category: "",
    inventary: [],
    brand: "",
    description: "",
  },
];

//Inventary example XD:

//inventary: [{
//  models: "",
//  sizes: [{
//    size: "",
//    stock: 0
//  }]

// const categories: category[] = [
//   "category1",
//   "category2",
//   "category3",
//   "category4",
// ];

var cat: string | null = null;

function Home() {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    fetch("https://dinokids.site/categories")
      .then((res) => res.json() as Promise<category[]>)
      .then((list) => {
        console.log(list);
        setCategories(list);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (category == undefined) {
      fetch("https://dinokids.site/products")
        .then((res) => res.json() as Promise<Product[]>)
        .then((products) => {
          console.log(products);
          setProducts(products);
        });
    } else {
      fetch(`https://dinokids.site/products/category/${category}`)
        .then((res) => res.json() as Promise<Product[]>)
        .then((products) => {
          console.log(products);
          setProducts(products);
          cat = category;
        });
    }
  }, []);

  const [productsList, setProducts] = useState<Product[]>(products);
  const loadPage = () => {
    if (!isLoading) {
      return (
        <>
          <div className='row m-0'>
            <Sidebar categories={categories} />
            <List products={productsList} />
          </div>
          <div className='row m-0'>
            <Footer />
          </div>
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={categories}/>
        <Mininav product={null} category={cat}></Mininav>
        {loadPage()}
        <FloatingButton />
      </div>
    </>
  );
}

export default Home;
