import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, Alert, InputGroup, InputGroupAddon, InputGroupText, FormFeedback, FormGroup, NavLink } from 'reactstrap';
import axios from "axios"

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            full_name: "",
            username: "",
            phone: "+90",
            password: "",
            repeat_password: "",
            err: []
        };

        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    handlePhoneChange(e) {

        let new_phone = e.target.value.replace(/[^0-9+]/g, "");

        if (!new_phone.startsWith("+90"))
            new_phone =  "+90";

        this.setState({ phone: new_phone });

    }

    handleCreateAccount(e) {
        let err = [];

        if (this.state.full_name.length < 3 )
            err.push("You full name must be at least 3 characters!");

        if (this.state.username.length < 3 )
            err.push("You username must be at least 3 characters!");

        if (this.state.password.length < 6 )
            err.push("You password must be at least 6 characters!");

        if (this.state.repeat_password !== this.state.password)
            err.push("The passwords you entered do not match!");

        if (this.state.phone.length !== 13)
            err.push("Your phone number must be in +905554938592 format!");

        if (this.state.full_name.split(" ").length < 2)
            err.push("You must enter your full name!");

        if (!this.validateEmail(this.state.email))
            err.push("Please enter a valid email!");


        let user = {
            full_name: this.state.full_name,
            username: this.state.username,
            phone: this.state.phone,
            password: this.state.password,
            email: this.state.email
        };

        this.setState({ err: err });

        if (err.length === 0){

            axios
                .post("https://ciftkale.herokuapp.com/api/register", user)
                .then(res => {
                    let d = res.data;

                    if (d.result === "success"){
                        this.setState({ registered: true });
                    }
                    else {
                        this.setState({ registered: false });
                        err.push(d.result.error ? d.result.error : "There is already an user with that identity information you provide!");
                        this.setState({ err: err });
                    }
                })
                .catch(err => this.setState({ registered: true }))
            ;

        }
    }

    render() {
        return (
          <div className="app flex-row align-items-center">
            <Container>
                { this.state.err.map(err => {
                    return (
                            <Row key={err} className="justify-content-center">
                                <Col md="6">
                                    <Alert color="danger">
                                        {err}
                                    </Alert>
                                </Col>
                            </Row>
                        )
                })}

                {this.state.registered &&
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Alert color="success">
                                You have successfully registered!
                            </Alert>
                        </Col>
                    </Row>
                }

                <Row className="justify-content-center">
                <Col md="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <h1>Register</h1>
                      <p className="text-muted">Create your account as Person</p>

                            <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-badge"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Full Name" onChange={e => this.setState({ full_name: e.target.value })} value={this.state.full_name} />
                          </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} value={this.state.username}/>
                      </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email}/>
                        </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addon      Type="prepend">
                          <InputGroupText>
                            <i className="icon-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Phone number" onChange={this.handlePhoneChange} value={this.state.phone}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" onChange={e => this.setState({ repeat_password: e.target.value })} value={this.state.repeat_password} />
                      </InputGroup>
                      <Button color="success" onClick={this.handleCreateAccount} disabled={this.state.registered} block>Create Account</Button>
                    </CardBody>
                    <CardFooter className="p-4">
                      <Row>
                        <Col xs="6" sm="6">
                            <NavLink href="#/login">
                                <Button color="primary" block>Login</Button>
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

export default Register;
