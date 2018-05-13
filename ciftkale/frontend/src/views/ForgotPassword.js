import React, {Component} from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, NavLink, Alert } from 'reactstrap';
import axios from 'axios';


class ForgotPassword extends Component {
  constructor(props) {
      super(props);

      this.state = {
          phone: "+90",
          rpFail: false,
          rpSuccess: false
      };

      this.handleResetPassword = this.handleResetPassword.bind(this);
      this.handlePhoneChange = this.handlePhoneChange.bind(this);

  }

  handleResetPassword(event) {
      event.preventDefault();

      const phone = this.state.phone;

      this.setState({ rpFail: false });

      if (phone.length !== 13){
          this.rpFail();
          return;
      }


      axios
          .post("https://ciftkale.herokuapp.com/api/forgotpassword", { phone: this.state.phone })
          .then(res => {
              let d = res.data;

              if (d.result === "success")
                  this.rpSuccess();
              else
                  this.rpFail();
          })
          .catch(err => {
              this.rpSuccess();
          })
      ;

  }

    rpSuccess() {
      this.setState({ rpFail: false, rpSuccess: true });
  }

    rpFail() {
      this.setState({ rpFail: true, rpSuccess: false });
  }

  handlePhoneChange(e) {

      let new_phone = e.target.value.replace(/[^0-9+]/g, "");

      if (!new_phone.startsWith("+90"))
        new_phone =  "+90";

      this.setState({ phone: new_phone });

  }

  render() {
    return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Alert color="danger" isOpen={ this.state.rpFail }>
                  The phone number you entered is wrong!
                </Alert>
              </Col>
            </Row>
              {this.state.rpSuccess  ?
                  <Alert color="success">
                    We have sent your new passsword to {this.state.phone}.
                    <a href="#/login"> Go Login</a>
                  </Alert>
               :
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
                        <Input type="text" placeholder="Phone number" value={this.state.phone}
                               onChange={this.handlePhoneChange}/>
                      </InputGroup>
                      <Button color="success" onClick={this.handleResetPassword} block>Reset Password</Button>
                    </CardBody>
                    <CardFooter className="p-4">
                      <Row>
                        <Col xs="6" sm="6">
                          <NavLink href="#/login">
                            <Button color="primary" block>Login</Button>
                          </NavLink>
                        </Col>
                        <Col xs="6" sm="6">
                          <NavLink href="#/register">
                            <Button color="warning" block>Register</Button>
                          </NavLink>
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              }
          </Container>
        </div>
    );
  }
}

export default ForgotPassword;
