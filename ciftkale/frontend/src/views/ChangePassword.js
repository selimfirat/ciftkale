import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';
import axios from 'axios';

class ChangePassword extends Component {

    constructor() {
        super();

        this.state = {
            success: false,
            current_password: "",
            new_password: "",
            err: "",
            new_password_repeat: ""
        };

        this.handleChangePassword = this.handleChangePassword.bind(this);

    }

    handleChangePassword(e) {
        e.preventDefault();




        let new_password = this.state.new_password;
        let new_password_repeat = this.state.new_password_repeat;
        let username = localStorage["username"];
        let password = this.state.current_password;

        if (new_password < 6){
            this.setState({err: "The passwords must be at least 6 characters!"});
            return;
        } else if (new_password_repeat !== new_password) {
            this.setState({err: "The new passwords do not match!"});
            return;
        }

        axios
            .post("https://ciftkale.herokuapp.com/api/changepassword", {
                username: username,
                current_password: password,
                new_password: new_password
            })
            .then(res => {
                let d = res.data;

                if (d.result === "success")
                    this.setState({success: true, err: ""});
                else {
                    this.setState({err: d.error});
                }

            })
            .catch(err => {
                this.setState({success: true, err: ""})
            })
        ;

    }
    
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    {this.state.err &&
                        <Row className="justify-content-center">
                            <Col md="6">
                                <Alert color="danger">
                                    {this.state.err}
                                </Alert>
                            </Col>
                        </Row>
                    }

                    {this.state.success &&
                        <Row className="justify-content-center">
                            <Col md="6">
                                <Alert color="success">
                                    You have successfully changed your password!
                                </Alert>
                            </Col>
                        </Row>
                    }
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Change Password</h1>
                                    <p className="text-muted">You just need your current password to change it.</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Current password" value={this.state.password} onChange={e => this.setState({current_password:e.target.value})} />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="New password" value={this.state.new_password} onChange={e => this.setState({new_password:e.target.value})} />
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Repeat new password" value={this.state.new_password_repeat} onChange={e => this.setState({new_password_repeat: e.target.value})}/>
                                    </InputGroup>
                                    <Button color="success" disabled={this.state.success} onClick={this.handleChangePassword} block>Change Password</Button>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ChangePassword;