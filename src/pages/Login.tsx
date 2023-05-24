import Navbar from "../components/navbar";
import Newform from "../components/newform";

function logIn() {
  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null}/>
        <div className="row mx-0 mt-5"><h3>Iniciar Sesión</h3></div>
        <div className='row m-0'>
          <Newform />
        </div>
      </div>
    </>
  );
}

export default logIn;
