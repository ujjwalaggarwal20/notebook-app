import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from './Alert';
import otherContext from '../context/otherContext';
import success from './icons/check.png';
import icon from './icons/notebook.png';


export default function Navbar() {
    const context = useContext(otherContext);
    // states for Alert component
    const { display, changeDisplay, alert, setalert } = context;

    // state is formed because Alert component was showing multiple times when triggered in other components too
    const [logoutBlock, setlogoutBlock] = useState(false);

    // useLocation hook
    const location = useLocation();
    const navigate = useNavigate();
    // logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        setlogoutBlock(true);
        setalert({ type: "success", message: "LogOut Successfull", icon: success });
        changeDisplay();
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={icon} alt="icon" height="30px"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ''}`} to="/about">About</Link>
                        </li>
                    </ul>

                    {localStorage.getItem('token') ? <form className="d-flex"><button onClick={handleLogout} className="btn btn-primary btn-lg" tabIndex="-1">Logout</button></form> : <form className="d-flex"> <Link to="/login" className="btn btn-primary btn-lg mx-2" tabIndex="-1" role="button">Login</Link>
                        <Link to="/signup" className="btn btn-success btn-lg mx-2" tabIndex="-1" role="button">Signup</Link></form>}


                </div>
            </div>
        </nav>
        <div>{display && logoutBlock && <Alert type={alert.type} message={alert.message} icon={alert.icon} />}</div>
        </>
    )
}
