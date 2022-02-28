import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../common/header/Header";

const Controller = () => {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default Controller;