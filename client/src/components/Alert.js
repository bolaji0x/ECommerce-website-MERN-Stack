import { useAppContext } from '../context/appContext'

import { BiInfoCircle, BiX } from "react-icons/bi";
const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return (
  <div className={`alert alert-${alertType}`}>
    <div className='alert-lflex'>
      <button ><BiInfoCircle className={`alertbtn alert-${alertType}`} /></button>
      <p className='alert-text'>{alertText}</p>
    </div>
    <button><BiX className={'alertbtn'} /></button>
  </div>
  )
}

export default Alert
