import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';
import axios from 'axios';

class ChangeUsername extends Component {
    constructor() {
        super();

        this.state = {
            wrong_current_password: false,
            success: false,
            invalid_username: false,
            password: "",
            new_username: "",
            new_username_exists: false,
            err: ""
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);

    }

    handleChangeUsername() {
        if (this.state.new_username.length < 3)
            this.setState({ invalid_username: true });


        let new_username = this.state.new_username;
        let username = localStorage["username"];
        let password = this.state.password;

        axios
            .post("https://ciftkale.herokuapp.com/api/changeusername", { username: username, password: password, new_username: new_username })
            .then(res => {
                let d = res.data;

                if (d.result === "success")
                    this.setState({ success: true, err: "" });
                else {
                    this.setState({ err: d.error });
                }

            })
            .catch(err => {

                this.setState({ success: true, err: "" })
            })
        ;

        // axios check current password
       // this.setState({ wrong_current_password: true });

   //     return (<Redirect to="#/logout"></Redirect>)
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
                                You have successfully changed your username!
                            </Alert>
                        </Col>
                    </Row>
                    }
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                            <h1>Change Username</h1>
                                            <p className="text-muted">Change your username</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="New Username" onChange={e => this.setState({ new_username: e.target.value }) } value={ this.state.new_username } />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Current Password" onChange={e => this.setState({ password: e.target.value }) } value={ this.state.password }/>
                                    </InputGroup>

                                    <Button color="success" onClick={this.handleChangeUsername} block>Change your username</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ChangeUsername;
