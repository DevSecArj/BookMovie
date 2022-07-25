import React from "react";
import logo from "../../assets/logo.svg"
import './Header.css'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../../screens/bookshow/BookShow"
import { Link } from 'react-router-dom';

export default function Header() {
    const baseUrl = "/api/v1/";
    return (
        // <Router>        
            <div className= "header-style">
                <img className="rotate-icon" src={logo}>
                </img>
                <div>
                <Button variant="contained" className="login-button">LOGIN</Button>
                {/* <Route path="/bookshow/:id" render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
                 /> */}
                <Link to="/bookshow/1234">
                <Button variant="contained" className="book-show-button" color="primary">BOOK SHOW</Button>
                </Link>
                </div>
        </div>
        // </Router>

    )
}
