import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        sessionStorage.clear();
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    {/* <li><Link to="/buyerprofile"><span class="glyphicon glyphicon-log-in"></span> Profile</Link></li> */}
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/ownerlogin"><span class="glyphicon glyphicon-log-in"></span>Owner Login</Link></li>
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        // let disableFeatures=null;
        if (cookie.load('cookie')) {

            redirectVar = <Redirect to="/home" />

        }


        return (
            <div>
                {/* {redirectVar} */}
                <nav class="navbar navbar-default" style={{backgroundColor:"#fafafa"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" style={{color:"red", fontWeight:"normal", fontSize: "26px", fontFamily:"Impact"}} href="/">GRUBHUB</a>
                        </div>
                        {/* <ul class="nav navbar-nav">
                            <li class="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/create">Add a Book</Link></li>
                            <li><Link to="/delete">Delete a Book</Link></li>
                        </ul> */}
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;