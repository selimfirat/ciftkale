import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label } from 'reactstrap';

class MakeOfferTeam extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Make Offer: Barcelona</h1>
                                    <p className="text-muted">You can make offer via money and also optionally by adding some players from your team to the bucket.</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-money"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="($) Money Amount"/>
                                    </InputGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="multiple-select">Select Players in target team to get as bucket</Label>
                                        </Col>
                                        <Col md="9">
                                            <Input type="select" name="multiple-select" id="multiple-select" multiple>
                                                <option value="1">Target Team Player #1</option>
                                                <option value="1">Target Team Player #2</option>
                                                <option value="1">Target Team Player #3</option>
                                                <option value="1">Target Team Player #4</option>
                                                <option value="1">Target Team Player #5</option>
                                                <option value="1">Target Team Player #6</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="multiple-select">Select Players in your team to send as bucket</Label>
                                        </Col>
                                        <Col md="9">
                                            <Input type="select" name="multiple-select" id="multiple-select" multiple>
                                                <option value="1">Player #1</option>
                                                <option value="1">Player #2</option>
                                                <option value="1">Player #3</option>
                                                <option value="1">Player #4</option>
                                                <option value="1">Player #5</option>
                                                <option value="1">Player #6</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <Button color="success" block>Make offer</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MakeOfferTeam;
