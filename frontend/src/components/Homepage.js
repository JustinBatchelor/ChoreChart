import React, {Component} from "react";
import CreateChorePage from "./CreateChorePage";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import LandingPage from "./LandingPage";


export default class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <Router>
            <Routes>
                <Route exact path='/' element={<LandingPage/>}></Route>
                <Route exact path='/create' element={<CreateChorePage/>}></Route>
            </Routes>
        </Router>);
    }
}