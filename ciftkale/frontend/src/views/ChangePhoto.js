import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label} from 'reactstrap';

class ChangePhoto extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                            <h1>Change Photo</h1>
                                            <p className="text-muted">Change your photo</p>
                                    <p><img src="img/users/alper.jpg" style={{width: "200px", height: "200px", margin: "15px"}} alt=""/></p>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="file-input">New Photo</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="file" id="file-input" name="file-input"/>
                                        </Col>
                                    </FormGroup>

                                    <Button color="success" block>Change your photo</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ChangePhoto;
