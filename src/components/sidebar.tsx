import { useContext } from "react";
import { Category } from "../types";
// import "./css/sidebar.css";
import { Link, useParams } from "react-router-dom";
import { ContentContext } from "../contexts/contentContext";

interface Props {
  categories: Category[];
}

var key = 0;

function Sidebar({ categories }: Props) {
  const { product } = useParams();
  const { setFilters, filters } = useContext(ContentContext);

  const adminActions = () => {
    const token = window.localStorage.getItem("UserSession");
    if (!token) {
      return <></>;
    }
    return (
      <>
        <h5 className='py-2 m-0 text-white'>Acciones</h5>
        <div className='list-group '>
          <Link to={"/AddItem"}>
            <button className='btn btn-danger mb-2'>Añadir producto</button>
          </Link>
          <Link to={"/AddCategory"}>
            <button className='btn btn-danger mb-2'>Añadir categoria</button>
          </Link>
          <Link to={"/Login"}>
            <button className='btn btn-danger mb-2'>Iniciar Sesión</button>
          </Link>
          <div>
            <button
              className='btn btn-danger mb-2'
              onClick={() => window.localStorage.removeItem("UserSession")}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </>
    );
  };

  const categoriesList = () => {
    const list = categories.map((e, index) => {
      key = key + 1;
      if (e.name == filters.category && !product) {
        return (
          <button
            key={key}
            className='btn btn-outline-secondary_blue border-2 text-white fw-normal mb-1'
          >
            {e.name}
          </button>
        );
      }
      return (
        <Link to={`/category/${e.name}`} key={key}>
          <button
            className='btn btn-secondary_blue border-2 text-white fw-normal mb-1 w-100'
            onClick={() => {
              setFilters({ category: e.name });
            }}
          >
            {e.name}
          </button>
        </Link>
      );
    });
    return list;
  };

  return (
    <div className='col-3 col-lg-2 px-3 bg-main_blue d-none d-sm-block'>
      <h5 className='py-3 m-0 text-white'>Categorias</h5>
      <div className='list-group'>{categoriesList()}</div>
      {adminActions()}
    </div>
  );
}

export default Sidebar;
