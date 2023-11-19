import { UseAlert } from "../../hooks/useAlert";

type Props = {
  alert: UseAlert;
};

function ShowAlert({ alert }: Props) {
  return (
    <div hidden={alert.state == undefined}>
      <div
        className={`alert alert-${alert.state?.color} alert-dismissible col-3 mx-auto fixed-bottom`}
        role='alert'
      >
        {alert.state?.message}
        <button type='button' className='btn-close' onClick={alert.close} />
      </div>
    </div>
  );
}

export default ShowAlert;
