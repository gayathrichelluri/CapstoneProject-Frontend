import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../common/header/Header";

const Controller = () => {
    const baseUrl = "/api/v1/";
    return (
        <>
            <Header/>
            <Router>
                <div className="main-container">
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} />}
                    />
                </div>
            </Router>
        </>
    );
};

export default Controller;