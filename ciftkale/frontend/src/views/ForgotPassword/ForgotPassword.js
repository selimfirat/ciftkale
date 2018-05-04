import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';


class ForgotPassword extends Component {
  render() {
    return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Forgot Password?</h1>
                    <p className="text-muted">Reset your password</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Phone number"/>
                    </InputGroup>
                    <Button color="success" block>Reset Password</Button>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="6" sm="6">
                        <Button color="primary" block>Login</Button>
                      </Col>
                      <Col xs="6" sm="6">
                        <Button color="secondary" block>Register</Button>
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

export default ForgotPassword;
