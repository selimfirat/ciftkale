import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';

class ChangeUsername extends Component {
    constructor() {
        super();

        this.state = {
            wrong_current_password: false,
            success: false,
            invalid_username: false,
            password: "",
            new_username: ""
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);

    }

    handleChangeUsername() {
        if (this.state.new_username.length < 3)
            this.setState({ invalid_username: true });


        // axios check current password
        this.setState({ wrong_current_password: true });

   //     return (<Redirect to="#/logout"></Redirect>)
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
                    {this.state.invalid_username &&
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Alert color="danger">
                                Your username is invalid. It must at least be 3 characters.
                            </Alert>
                        </Col>
                    </Row>
                    }

                    {this.state.registered &&
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
