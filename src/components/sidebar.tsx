import { category } from "../types";
import "./sidebar.css";
import { Link, useParams } from "react-router-dom";

interface Props {
  categories: category[];
}

var key = 0;

function Sidebar({ categories }: Props) {
  const { category } = useParams();

  const adminActions = () => {
    const token = window.localStorage.getItem("UserSession");
    if (token == null) {
      return <></>;
    }
    return (
      <>
        <h5 className='py-2'>Acciones</h5>
        <div className='list-group '>
          <Link
            to={"/AddItem"}
            className='list-group-item list-group-item-action list-group-item-light'
          >
            Añadir producto
          </Link>
          <Link
            to={"/AddCategory"}
            className='list-group-item list-group-item-action list-group-item-light'
          >
            Añadir categoria
          </Link>
        </div>
      </>
    );
  };

  const categoriesList = () => {
    const list = categories.map((e, index) => {
      key = key + 1;
      if (e.name == category) {
        return (
          <Link
            key={key}
            to={`/category/${e.name}`}
            className='list-group-item list-group-item-action list-group-item-light disabled'
          >
            {e.name}
          </Link>
        );
      }
      return (
        <Link
          key={key}
          to={`/category/${e.name}`}
          className='list-group-item list-group-item-action list-group-item-light'
        >
          {e.name}
        </Link>
      );
    });
    return list;
  };

  return (
    <div className='col-3 col-lg-2 px-2 sidebar'>
      <h5 className='py-2'>Categorias</h5>
      <div className='list-group '>{categoriesList()}</div>
      {adminActions()}
    </div>
  );
}

export default Sidebar;
