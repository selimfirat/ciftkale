import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, NavLink, Alert} from 'reactstrap';
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginFail: false,
            username: "",
            password: "",
            error: ""
        };


        this.handleLogin = this.handleLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.loginFail = this.loginFail.bind(this);

    }


    handleLogin(event) {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        this.setState({ loginFail: false });

        if (username.length < 3 || password.length < 3) {
            this.loginFail("Username or password cannot be less than 3 characters!");
            return;
        }


        axios
            .post("https://ciftkale.herokuapp.com/api/login", { username: username, password: password })
            .then(res => {
                let d = res.data;

                if (d.result === "success")
                    return this.loginSuccess(username);
                else
                    return this.loginFail(d.error);

            })
            .catch(err => {
                this.loginSuccess(username);
            })
        ;

    }

    loginSuccess(username) {
        this.setState({ loginFail: false });
        localStorage["username"] = username;
        console.log(username)
        localStorage["director"] = (username !== "selimfirat");
        this.props.history.push('/dashboard');
    }

    loginFail(error) {
        this.setState({ loginFail: true, error: error });
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
              <Container>
                  <Row className="justify-content-center">
                      <Col md="6">
                          <Alert color="danger" isOpen={ this.state.loginFail }>
                              Wrong username or password!
                          </Alert>
                      </Col>
                  </Row>
                  <Row className="justify-content-center">
                      <Col md="6">
                        <Card className="mx-4">
                          <CardBody className="p-4">
                            <h1>Login</h1>
                            <p className="text-muted">Sign in to your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} value={this.state.username}  />
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="password"  placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
                            </InputGroup>
                            <Button color="success" onClick={this.handleLogin} block>Login</Button>
                          </CardBody>
                          <CardFooter className="p-4">
                            <Row>
                              <Col xs="6" sm="6">
                                  <NavLink href="#/register">
                                        <Button color="primary" block>Register</Button>
                                  </NavLink>
                              </Col>
                              <Col xs="6" sm="6">
                                  <NavLink href="#/forgotpassword">
                                      <Button color="warning" block>Forgot Password?</Button>
                                  </NavLink>
                              </Col>
                            </Row>
                          </CardFooter>
                        </Card>
                      </Col>
                    </Row>
              </Container>
            </div>
        );
    }
}