import "./css/floatingButton.css";

const FloatingButton = () => {
  return (
    <div className='whatsapp_div'>
      <a href='https://www.facebook.com/profile.php?id=100063770313079'>
        <img src='/facebook.png' className='whatsapp_icon' />
      </a>
      <hr className="my-1 border-0"/>
      <a href='https://api.whatsapp.com/send?phone=543884482990'>
        <img src='/whatsapp.png' className='whatsapp_icon' />
      </a>
    </div>
  );
};

export default FloatingButton;
