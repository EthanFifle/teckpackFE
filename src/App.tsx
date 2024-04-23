import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Styling/App.css';

import NavBar from "./Components/NavBar";
import About from './Routes/About';
import Project from './Routes/Project';
import Research from './Routes/Research';
import GetStarted from "./Routes/GetStarted";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <div className="content relative w-full flex-grow">
                    <Routes>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/project" element={<Project/>}/>
                        <Route path="/research" element={<Research/>}/>
                        <Route path="/getstarted" element={<GetStarted/>}/>
                    </Routes>
                </div>
            </div>
        </Router>

    );
}

export default App;
