import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label, Alert } from 'reactstrap';
import axios from 'axios';

const qs = require('query-string');

class MakeOffer extends Component {
    constructor(props) {
        super(props);

        let params = qs.parse(props.location.search);

        this.player = params.username ? params.username : "";

        let director = localStorage['username'];

        this.club_name = null;
        this.director_name = null;

        this.state = {
            playername: "",
            myplayers: [],
            success: false
        }

        axios.get('http://ciftkale.herokuapp.com/api/player', {params: {username: this.player}})
            .then(res => {
                this.setState({playername: res.data.name});
                
                axios.get('http://ciftkale.herokuapp.com/api/club',{params: {
                    'club_name': res.data.team
                }}).then(res => {
                    this.director_name = res.data.director_username;
                });
            });
        axios.get('http://ciftkale.herokuapp.com/api/director', {params: {username: director}})
            .then(res => {
                this.club_name = res.data.club_name;
                let params = {
                    'page': 0,
                    'pageSize': 1000,
                    'sortInfo': [],
                    'filterTeam': this.club_name
                }
                axios.get('http://ciftkale.herokuapp.com/api/players', {params: params})
                    .then(res => {
                        this.setState({myplayers: res.data.res})
                    });
                    
            });

            this.submitOffer = this.submitOffer.bind(this);
    }

    submitOffer() {
        const selected = document.querySelectorAll('#multiple-select option:checked');
        const unames = Array.from(selected).map((el) => el.value);

        const price = 0+document.querySelector('#price').value;
        let self = this;

        axios.post('http://ciftkale.herokuapp.com/api/makeoffer', {
            price: price,
            players: unames,
            sender: localStorage['username'],
            receiver: this.director_name
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
                                            <h1>Make Offer: { this.state.playername }</h1>
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
                                            <Label htmlFor="multiple-select">Select Players in your team to send as bucket</Label>
                                        </Col>
                                        <Col md="9">
                                            <Input type="select" name="multiple-select" id="multiple-select" multiple>
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

export default MakeOffer;
