import "./css/floatingButton.css"

const FloatingButton = () => {
  return (
    <div className='whatsapp_div'>
      <a href="https://api.whatsapp.com/send?phone=3884432288"><img src='./whatsapp.png' className="whatsapp_icon"/></a>
    </div>
  );
};

export default FloatingButton;
