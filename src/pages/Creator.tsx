import Navbar from "../components/navbar"
import Itemform from "../components/Itemform"

const Creator = () => {
  return <>
    <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null}/>
        <div className="row mx-0 mt-5"><h3>Agregar Producto</h3></div>
        <div className='row m-0'>
          <Itemform product={undefined}/>
        </div>
      </div>
  </>
}

export default Creator