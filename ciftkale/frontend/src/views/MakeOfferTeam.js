import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Alert } from 'reactstrap';
const qs = require('query-string');
import axios from 'axios';

class MakeOfferTeam extends Component {
    constructor(props) {
        super(props);

        let director = localStorage['username'];

        let params = qs.parse(props.location.search);

        this.your_club_name = params.team ? params.team : "";

        this.my_club_name = null;
        this.director_name = null;

        this.state = {
            myplayers: [],
            yourplayers: [],
            success: false
        }

        axios.get('http://ciftkale.herokuapp.com/api/director', {params: {username: director}})
            .then(res => {
                this.my_club_name = res.data.club_name;
                let params = {
                    'page': 0,
                    'pageSize': 1000,
                    'sortInfo': [],
                    'filterTeam': this.my_club_name
                }
                axios.get('http://ciftkale.herokuapp.com/api/players', {params: params})
                    .then(res => {
                        this.setState({myplayers: res.data.res})
                    });
                    
            });
        axios.get('http://ciftkale.herokuapp.com/api/club',{params: {
            'club_name': this.your_club_name
        }}).then(res => {
            this.your_director_name = res.data.director_username;

            let params = {
                'page': 0,
                'pageSize': 1000,
                'sortInfo': [],
                'filterTeam': this.your_club_name
            }
            axios.get('http://ciftkale.herokuapp.com/api/players', {params: params})
                .then(res => {
                    this.setState({yourplayers: res.data.res})
                });
        });

        this.submitOffer = this.submitOffer.bind(this);
    }

    submitOffer() {
        const selected = document.querySelectorAll('#multiple-select-sender option:checked');
        const senderplayers = Array.from(selected).map((el) => el.value);
        const selected2 = document.querySelectorAll('#multiple-select-receiver option:checked');
        const receiverplayers = Array.from(selected2).map((el) => el.value);

        console.log(senderplayers);
        console.log(receiverplayers);
        console.log(receiverplayers.concat(senderplayers));
        

        const price = 0+document.querySelector('#price').value;
        let self = this;
        axios.post('http://ciftkale.herokuapp.com/api/makeoffer', {
            price: price,
            players: receiverplayers.concat(senderplayers),
            sender: localStorage['username'],
            receiver: this.your_director_name
        }).then(function () {
            self.setState({ success: true });
        });
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Alert color="success" isOpen={ this.state.success}>
                                You have successfully made an offer!
                            </Alert>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Make Offer: {this.your_club_name}</h1>
                                    <p className="text-muted">You can make offer via money and also optionally by adding some players from your team to the bucket.</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fa fa-money"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="($) Money Amount" id="price"/>
                                    </InputGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="multiple-select">Select Players in target team to get as bucket</Label>
                                        </Col>
                                        <Col md="9">
                                            <Input type="select" name="multiple-select" id="multiple-select-receiver" multiple>
                                            {
                                                this.state.yourplayers.map(function(p) {
                                                    let pname = p[2] + ' ' + p[3];
                                                    let uname = p[5];
                                                    return (<option value={uname}>{pname}</option>);
                                                })
                                            }
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="multiple-select">Select Players in your team to send as bucket</Label>
                                        </Col>
                                        <Col md="9">
                                            <Input type="select" name="multiple-select" id="multiple-select-sender" multiple>
                                            {
                                                this.state.myplayers.map(function(p) {
                                                    let pname = p[2] + ' ' + p[3];
                                                    let uname = p[5];
                                                    return (<option value={uname}>{pname}</option>);
                                                })
                                            }
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <Button color="success" block disabled={this.state.success} onClick={this.submitOffer}>Make offer</Button>
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
