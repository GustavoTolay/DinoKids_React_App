import Navbar from "../components/navbar"
// import Itemform from "../components/Itemform"
import NewItemForm from "../components/newItemForm"

const Creator = () => {
  return <>
    <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null}/>
        <div className="row mx-0 mt-3"><h4 className="fw-semibold">Agregar Producto</h4></div>
        <div className='row m-0'>
          <NewItemForm />
        </div>
      </div>
  </>
}

export default Creator