import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { HashRouter, Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
class Header extends Component{

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "hide",
            password: "",
            passwordRequired: "hide",
            firstname: "",
            firstnameRequired: "hide",
            lastname: "",
            lastnameRequired: "hide",
            email: "",
            emailRequired: "hide",
            contact: "",
            contactRequired: "hide",
            setpassword: "",
            setpasswordRequired: "hide",
            registeredSuccessfully: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            openModal: false,
            tabValue: 0,
        }
    }

    onOpenModal = () => {
        this.setState({
            openModal: true,
            tabValue: 0,
            username: "",
            usernameRequired: "hide",
            password: "",
            passwordRequired: "hide",
            firstname: "",
            firstnameRequired: "hide",
            lastname: "",
            lastnameRequired: "hide",
            email: "",
            emailRequired: "hide",
            setpassword: "",
            setpasswordRequired: "hide",
            contact: "",
            contactRequired: "hide",
        });
    }

    onCloseModal() {
        this.setState({ openModal: false });
    }

    tabChangeHandler = (event, tabValue) => {
        this.setState({ tabValue });
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputsetPasswordChangeHandler = (e) => {
        this.setState({ setpassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    loginClickHandler = () =>{
        this.state.username === "" ? this.setState({ usernameRequired: "show" }) : this.setState({ usernameRequired: "hide" });
        this.state.password === "" ? this.setState({ passwordRequired: "show" }) : this.setState({ passwordRequired: "hide" });

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.onCloseModal();
            }
        });

        xhrLogin.open("POST", '/api/v1/' + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "show" }) : this.setState({ firstnameRequired: "hide" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "show" }) : this.setState({ lastnameRequired: "hide" });
        this.state.email === "" ? this.setState({ emailRequired: "show" }) : this.setState({ emailRequired: "hide" });
        this.state.setpassword === "" ? this.setState({ setpasswordRequired: "show" }) : this.setState({ registerPasswordRequired: "hide" });
        this.state.contact === "" ? this.setState({ contactRequired: "show" }) : this.setState({ contactRequired: "hide" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.setpassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: dataSignup,
            redirect: 'follow'
          };
        
        let that = this
        fetch(this.props.baseUrl + "signup", requestOptions)
        .then(response => {
            console.log("response",response)
        if(response.status === 201) {
            that.setState({
                registeredSuccessfully: true
            })
        }
        return response.text()})
        .then(result => console.log(" result ",result)
        )
        .catch(error => console.log('error', error));

    }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (     
            <div>  
                <div className= "header">
                    <img className="rotate-icon" src={logo}>
                    </img>
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.onOpenModal}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
     
                    {this.props.showBookShowButton==="true" && !this.state.loggedIn
                        ? <div className="book-show-button">
                                <Button variant="contained" color="primary" onClick={this.onOpenModal}>
                                    Book Show
                                </Button>
                        </div>
                        : ""
                    }
                      
                    {this.props.showBookShowButton==="true" && this.state.loggedIn
                        ? <div className="book-show-button">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }

                </div>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.openModal}
                    contentLabel="Login"
                    onRequestClose={this.onCloseModal}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.tabValue} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.tabValue === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {this.state.tabValue === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="setpassword">Password</InputLabel>
                                <Input id="setpassword" type="password" setpassword={this.state.setpassword} onChange={this.inputsetPasswordChangeHandler} />
                                <FormHelperText className={this.state.setpasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registeredSuccessfully === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
            )
        }
    }

export default Header;
