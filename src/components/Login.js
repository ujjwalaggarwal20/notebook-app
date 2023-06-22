import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';
import danger from './icons/alarm.png';
import success from './icons/check.png';
import otherContext from '../context/otherContext';

const Login = () => {
    const context = useContext(otherContext);

    // states for Alert component
    const { display, changeDisplay, alert, setalert} = context;

    // state is formed because Alert component was showing multiple times when triggered in other components too
    const [loginBlock, setloginBlock] = useState(false);

    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ username: "", password: "" })
    const [conditions, setconditions] = useState(false);

    // submit login info
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            setloginBlock(true);
            setalert({ type: "success", message: "Login Successfull", icon: success });
            changeDisplay();
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
        else {
            setalert({ type: "error", message: "Invalid User Credentials", icon: danger });
            setloginBlock(true);
            changeDisplay();
            navigate("/login");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // making the submit button disabled if password, username or checkbox is missing
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
                {display && loginBlock && <Alert type={alert.type} message={alert.message} icon={alert.icon} />}
            </div>
            <div className="container back" style={{ marginTop: '70px' }}>

                <div className="fs-1 my-3 text-decoration-underline">
                    Login
                </div>
                <form onSubmit={handleSubmit} className="back bg-transparent my-3">
                    <div className="mb-3">
                        <label htmlFor="exampleInputusername2" className="form-label mx-2 fs-4 logina1">Username</label>
                        <input onChange={onChange} type="text" name="username" className="form-control mx-2 w-50" id="exampleInputusername1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label mx-2 fs-4 logina1">Password</label>
                        <input onChange={onChange} type="password" name="password" className="form-control mx-2 w-50" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check mx-2">
                        <input onClick={handleCondition} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label fst-italic" htmlFor="exampleCheck1"><Link to="/conditions">Accept Terms & Conditions</Link></label>
                    </div>
                    <button type="submit" className={`btn btn-primary rounded-3 mx-2 my-2 ${conditions === true && credentials.username !== "" && credentials.password !== "" ? "" : "disabled"}`}>Submit</button>
                </form>
            </div>

            {/* <!-- Button trigger modal --> */}
            {/* <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button> */}

            {/* <!-- Modal --> */}
            {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">ALERT</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Invalid User Credentials
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Login;
