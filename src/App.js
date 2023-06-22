// import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/noteState';
import Login from "./components/Login";
import Signup from "./components/Signup";
import OtherStates from './context/otherStates';
import Conditions from "./components/Conditions";

function App() {
  return (
    <>
      {/* NoteState is present in Note context folder, check there for more info */}
      <OtherStates>
        <NoteState>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/conditions" element={<Conditions />} />
            </Routes>
          </Router>
        </NoteState>
      </OtherStates>
    </>
  );
}

export default App;
