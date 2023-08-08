import Mininav from "../components/mininav";
import Navbar from "../components/navbar";

function Contact() {
  return (
    <div className='App container-fluid p-0 m-0 min-vh-100 d-flex flex-column'>
      <Navbar categories={null} />
      <Mininav />
      <div className='row m-0'>
        <div className='col-12 col-lg-4 col-md-6 col-sm-8 mx-auto'>
          <h4 className='mt-3'>Dirección y Contacto</h4>
          <div className='card p-0 mb-0'>
            <div className='card-body text-start'>
              <h5 className='card-title fw-semibold text-primary'>
                Nuestra sucursal
              </h5>
              <hr className='m-0' />
              <p className='card-text mt-2 mb-1'>
                S. S. de Jujuy, Necochea 43, Local 2.
              </p>
              <p className='card-text mb-1'>
                Lunes a Viernes de 10:00 a 14:00 y de 18:00 a 22:00.
              </p>
              <p className='card-text'>Sábados de 10:00 a 14:00.</p>
            </div>
          </div>
          <div className=''>
            <div className='card mt-3 p-0'>
              <div className='card-body text-start'>
                <div className='row'>
                  <h5 className='card-title text-primary fw-semibold'>
                    Nuestras Redes
                  </h5>
                  <hr />
                </div>
                <div className='row'>
                  <div className='col-2 p-0 ms-auto'>
                    <a href="https://api.whatsapp.com/send?phone=543884482990">
                      <img
                        src='/whatsapp.png'
                        className='rounded-start rounded-end'
                        height={50}
                      />
                    </a>
                  </div>
                  <div className='col-2 p-0 mx-2'>
                    <a href='https://www.facebook.com/profile.php?id=100063770313079'>
                      <img
                        src='/facebook.png'
                        className='rounded-start rounded-end'
                        height={50}
                      />
                    </a>
                  </div>
                  <div className='col-2 p-0 me-auto'>
                    <a href='https://m.me/100169098619213'>
                      <img
                        src='/messenger.png'
                        className='rounded-start rounded-end'
                        height={50}
                      />
                    </a>
                  </div>
                  <div className=''></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
