import ShowAlert from "../components/admin/ShowAlert";
import Navbar from "../components/navbar";
import Newform from "../components/newform";
import useAlert from "../hooks/useAlert";

function logIn() {
  const alert = useAlert();

  return (
    <>
      <div className='App container-fluid p-0 m-0'>
        <Navbar categories={null} />
        <div className='row m-0 mt-3'>
          <h2 className='text-center m-0 fw-light'>Iniciar Sesión</h2>
          <hr />
        </div>
        <div className='row m-0 ms-2'>
          <Newform alert={alert}></Newform>
        </div>
        <div className={`row m-0`}>
          <ShowAlert alert={alert}></ShowAlert>
        </div>
      </div>
    </>
  );
}

export default logIn;
