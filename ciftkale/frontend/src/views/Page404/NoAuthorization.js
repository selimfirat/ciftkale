import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';

class NoAuthorization extends Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">401</h1>
                                <h4 className="pt-3">Oops! Come on...</h4>
                                <p className="text-muted float-left">You are not authorized to view this page.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NoAuthorization;
