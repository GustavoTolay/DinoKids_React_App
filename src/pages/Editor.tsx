import Navbar from "../components/navbar";
// import Itemform from "../components/Itemform";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import NewItemForm from "../components/newItemForm";

const Editor = () => {
  const { id } = useParams();

  const [productValues, setProductValues] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dinokids.site/products/${id}`)
      .then((res) => res.json() as Promise<Product>)
      .then((product) => {
        console.log(product);
        setProductValues(product);
        setIsLoading(false);
      });
  }, []);

  if (!isLoading) {
    return (
      <>
        <div className='App container-fluid p-0 m-0'>
          <Navbar categories={null}/>
          <div className='row mx-0 mt-5'>
            <h3>Editar Producto</h3>
          </div>
          <div className='row m-0'>
            {/* <Itemform product={productValues} /> */}
            <NewItemForm product={productValues}/>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null}/>
      </div>
    </>
  );
};

export default Editor;
