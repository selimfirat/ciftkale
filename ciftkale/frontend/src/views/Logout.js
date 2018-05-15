import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert} from 'reactstrap';
import axios from 'axios';

class Logout extends Component {
    constructor() {
        super();

        this.state = {
        };
        delete localStorage["username"];
    }

    render() {
        this.props.history.push('/dashboard')
        return (
            <div className="app flex-row align-items-center">
                <Container>
                </Container>
            </div>
        );
    }
}

export default Logout;
