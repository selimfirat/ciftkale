import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Label } from 'reactstrap';

class MakeOffer extends Component {
    constructor(props) {
        super(props);

        let params = qs.parse(props.location.search);

        this.player = params.username ? params.username : "";

        let director = localStorage['username'];

        this.club_name = null;

        this.state = {
            playername: "",
            myplayers: []
        }

        axios.get('http://ciftkale.herokuapp.com/api/player', {params: {username: this.player}})
            .then(res => {
                this.setState({playername: res.full_name});
            });
        axios.get('http://ciftkale.herokuapp.com/api/player', {params: {username: director}})
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
    }
    render() {        

        return (
            <div className="app flex-row align-items-center">
                <Container>
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
                                        <Input type="text" placeholder="($) Money Amount"/>
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
                                                    return (<option value="{uname}">{pname}</option>);
                                                })
                                            }
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

export default MakeOffer;
