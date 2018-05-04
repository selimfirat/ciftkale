import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

class OffersToAccept extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Offer</strong>
                            </CardHeader>
                            <CardBody>
                                <dl className="row">
                                    <dt className="col-sm-4">Offer From</dt>
                                    <dd className="col-sm-8">Barcelona's Director Alper Şahıstan</dd>
                                    <dt className="col-sm-4">Offered Money</dt>
                                    <dd className="col-sm-8">$90M</dd>
                                    <dt className="col-sm-4">Offered Player(s)</dt>
                                    <dd className="col-sm-8">Sergi Roberto</dd>
                                    <dt className="col-sm-4">Your player(s) in Return</dt>
                                    <dd className="col-sm-8">Mesut Ozil</dd>
                                    <dt className="col-sm-4"></dt>
                                    <dd className="col-sm-8">Hakan Türkmenoğlu</dd>
                                </dl>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Offer</strong>
                            </CardHeader>
                            <CardBody>
                                <dl className="row">
                                    <dt className="col-sm-4">Offer From</dt>
                                    <dd className="col-sm-8">Barcelona's Director Alper Şahıstan</dd>
                                    <dt className="col-sm-4">Offered Money</dt>
                                    <dd className="col-sm-8">$90M</dd>
                                    <dt className="col-sm-4">Offered Player(s)</dt>
                                    <dd className="col-sm-8">Sergi Roberto</dd>
                                    <dt className="col-sm-4">Your player(s) in Return</dt>
                                    <dd className="col-sm-8">Mesut Ozil</dd>
                                    <dt className="col-sm-4"></dt>
                                    <dd className="col-sm-8">Hakan Türkmenoğlu</dd>
                                </dl>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Offer</strong>
                            </CardHeader>
                            <CardBody>
                                <dl className="row">
                                    <dt className="col-sm-4">Offer From</dt>
                                    <dd className="col-sm-8">Barcelona's Director Alper Şahıstan</dd>
                                    <dt className="col-sm-4">Offered Money</dt>
                                    <dd className="col-sm-8">$90M</dd>
                                    <dt className="col-sm-4">Offered Player(s)</dt>
                                    <dd className="col-sm-8">Sergi Roberto</dd>
                                    <dt className="col-sm-4">Your player(s) in Return</dt>
                                    <dd className="col-sm-8">Mesut Ozil</dd>
                                    <dt className="col-sm-4"></dt>
                                    <dd className="col-sm-8">Hakan Türkmenoğlu</dd>
                                </dl>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Offer</strong>
                            </CardHeader>
                            <CardBody>
                                <dl className="row">
                                    <dt className="col-sm-4">Offer From</dt>
                                    <dd className="col-sm-8">Barcelona's Director Alper Şahıstan</dd>
                                    <dt className="col-sm-4">Offered Money</dt>
                                    <dd className="col-sm-8">$90M</dd>
                                    <dt className="col-sm-4">Offered Player(s)</dt>
                                    <dd className="col-sm-8">Sergi Roberto</dd>
                                    <dt className="col-sm-4">Your player(s) in Return</dt>
                                    <dd className="col-sm-8">Mesut Ozil</dd>
                                    <dt className="col-sm-4"></dt>
                                    <dd className="col-sm-8">Hakan Türkmenoğlu</dd>
                                </dl>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>Offer</strong>
                            </CardHeader>
                            <CardBody>
                                <dl className="row">
                                    <dt className="col-sm-4">Offer From</dt>
                                    <dd className="col-sm-8">Barcelona's Director Alper Şahıstan</dd>
                                    <dt className="col-sm-4">Offered Money</dt>
                                    <dd className="col-sm-8">$90M</dd>
                                    <dt className="col-sm-4">Offered Player(s)</dt>
                                    <dd className="col-sm-8">Sergi Roberto</dd>
                                    <dt className="col-sm-4">Your player(s) in Return</dt>
                                    <dd className="col-sm-8">Mesut Ozil</dd>
                                    <dt className="col-sm-4"></dt>
                                    <dd className="col-sm-8">Hakan Türkmenoğlu</dd>
                                </dl>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OffersToAccept;
