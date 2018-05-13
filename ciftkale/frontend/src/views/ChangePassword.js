import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

class ChangePassword extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
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
                                        <Input type="password" placeholder="Current password"/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="New password"/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" placeholder="Repeat new password"/>
                                    </InputGroup>
                                    <Button color="success" block>Change Password</Button>
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