import React, { useEffect } from 'react'
import './Popup.css';
import ReactDOM from 'react-dom';


function Popup({open, setTrigger, children}) {

    useEffect(() => {
        const close = (e ) => {
          if(e.keyCode === 27){
            setTrigger(false);
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    if(open === false)
        return "";

    return ReactDOM.createPortal(
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick = {() => {setTrigger(false)}}> close</button>
                {children}

            </div>
        </div>
    , document.getElementById("modal-root"));
    
}


export default Popup;