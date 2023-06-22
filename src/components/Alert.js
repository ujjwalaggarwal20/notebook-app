import React from 'react'

export default function Alert(props) {
    let { type, message, icon } = props;
    const myfunc = (type, message, icon) => {
        if (type === "success") {
            return (<div className="alert alert-success" role="alert">
                <img src={icon} alt="Success: " height="30px" className="mx-2"/>
                {message}
            </div>)
        }
        else if (type === "error") {
            return (<div className="alert alert-danger" role="alert">
                <img src={icon} alt="Error: " height="30px" className="mx-2"/>
                {message}
            </div>)
        }
    }

    return (
        <div>
            {myfunc(type, message, icon)}
        </div>
    )
}
