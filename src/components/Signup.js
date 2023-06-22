import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';
import otherContext from '../context/otherContext';
import success from './icons/check.png';
import danger from './icons/alarm.png';


export default function Signup() {
    const context = useContext(otherContext);
    // states for Alert component
    const { display, changeDisplay, alert, setalert } = context;

    // state is formed because Alert component was showing multiple times when triggered in other components too
    const [signupBlock, setsignupBlock] = useState(false);

    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", username: "", password: "" });
    const [conditions, setconditions] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, username: credentials.username, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            setsignupBlock(true);
            setalert({ type: "success", message: "SignUp Successfull", icon: success });
            changeDisplay();
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
        else if(json.error){
            setalert({ type: "error", message: json.error, icon: danger });
            setsignupBlock(true);
            changeDisplay();
        }
        else {
            setalert({ type: "error", message: "Some Error Occured", icon: danger });
            setsignupBlock(true);
            changeDisplay();
            navigate("/signup");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleCondition = () => {
        if (conditions === false) {
            setconditions(true);
        }
        else {
            setconditions(false);
        }
    }
    return (
        <>
            <div className="position-absolute w-100">
                {display && signupBlock && <Alert type={alert.type} message={alert.message} icon={alert.icon} />}
            </div>
            <div className="container back" style={{ marginTop: '70px' }}>
                <div className="fs-1 my-3 text-decoration-underline">
                    Signup
                </div>
                <form onSubmit={handleSubmit} className="back bg-transparent my-3">
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label fs-4 mx-2 logina1">Name</label>
                        <input onChange={onChange} type="text" name="name" className="form-control mx-2 w-50" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername1" className="form-label fs-4 mx-2 logina1">Username</label>
                        <input onChange={onChange} type="text" name="username" className="form-control mx-2 w-50" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-4 mx-2 logina1">Password</label>
                        <input onChange={onChange} type="password" name="password" className="form-control mx-2 w-50" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check mx-2">
                        <input onClick={handleCondition} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label fst-italic" htmlFor="exampleCheck1"><Link to="/conditions">Accept Terms & Conditions</Link></label>
                    </div>
                    <button type="submit" className={`btn btn-primary mx-2 my-2 rounded-3 ${conditions === true && credentials.name !== "" && credentials.username !== "" && credentials.password !== "" ? "" : "disabled"}`}>Submit</button>
                </form>
            </div>
        </>
    )
}
