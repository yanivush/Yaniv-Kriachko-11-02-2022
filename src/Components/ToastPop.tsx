import { title } from 'process';
import React, {useState} from 'react';
import { Toast } from 'react-bootstrap';

interface IToastProps {
  title: string,
  messageArr: string[]
  istoshow : boolean
}

export const ToastPopup: React.FC<IToastProps> = props =>  {

    const [showToast, setshowToast] = useState(true);
  
    const toggleShow = () => setshowToast(!showToast);
   
        
    return (
    <>
     <Toast onClose={toggleShow} show={props.istoshow} animation={true}>
        <Toast.Header>
            <img src="" className="rounded me-2" alt="" />
            <strong className="me-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.messageArr.map((key, err) => {return <div key={key}>{err}</div>})}</Toast.Body>
    </Toast>
    </>
    )
    
}
    
export default ToastPopup;