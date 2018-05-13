import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';
import axios from 'axios';

class DeleteOwnAccount extends Component {
    constructor() {
        super();

        this.state = {
            wrong_current_password: false,
            current_password: ""
        };

        this.handleDeleteOwnAccount= this.handleDeleteOwnAccount.bind(this);
    }

    handleDeleteOwnAccount(e) {
        e.preventDefault();


        const current_password = this.state.current_password;

        let username = localStorage["username"];

        this.setState({ wrong_current_password: false });

        if (this.state.current_password.length <= 5)
            this.setState({ wrong_current_password: true });


        axios
            .post("/api/deleteownaccount", { username: username, current_password: current_password })
            .then(res => {
                let d = res.data;

                if (d.result === "success")
                    this.props.history.push('/logout')
                else
                    this.setState({ wrong_current_password: true });
            })
            .catch(err => {
                this.props.history.push('/logout')
            })
        ;
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    {this.state.wrong_current_password &&
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Alert color="danger">
                                The current password you entered is wrong!
                            </Alert>
                        </Col>
                    </Row>
                    }

                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Delete Own Account</h1>
                                    <p className="text-muted">Delete your account<br/> <strong>This process is irrecoverable!</strong></p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value }) } value={ this.state.password }/>
                                    </InputGroup>
                                    <Button color="danger" onClick={this.handleDeleteOwnAccount} block>Delete Your Account</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DeleteOwnAccount;
