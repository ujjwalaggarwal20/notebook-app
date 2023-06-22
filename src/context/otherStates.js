import otherContext from "./otherContext";
import { useState } from "react";

const OtherStates = (props) => {
    
    const [display, setdisplay] = useState(false);
    const [alert, setalert] = useState({ type: 'ok', message: 'ok', icon: null });

    const changeDisplay = () => {
        setdisplay(true);
        setTimeout(() => {
            setdisplay(false);
        }, 1500);
    }

    return (
        <otherContext.Provider value={{ display, changeDisplay, alert, setalert}}>
          {props.children}
        </otherContext.Provider>
      )
}

export default OtherStates;