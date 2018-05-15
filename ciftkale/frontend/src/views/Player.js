import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    NavLink
} from 'reactstrap';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { Link } from 'react-router-dom'
import Widget02 from './Widgets/Widget02';
import axios from 'axios';

const qs = require('query-string');

/*
const player = {
    name: "Sergi Roberto",
    img: "sergi_roberto.png",
    position_name: "Defence",
    kit_number: 20,
    weight: 68,
    height: 178,
    dominant_foot: "Right",
    shoot_accuracy: 70,
    salary: "1500000",
    date_of_birth: "02/07/1992",
    team: "Barcelona",
    agent: "Hakan Türkmenoğlu"
};
*/
class ViewPlayer extends Component {

    componentWillMount() {
        axios.get("https://ciftkale.herokuapp.com/api/player", {
            params: {
                username: this.props.match.params.id
            }
        }).then((response) => {
            this.setState({player: response.data})
        });
    }

    constructor(props) {
        super(props);


        console.log(props.match.params.id);

        this.state = {
            player: {
                name: "Sergi Roberto",
                img: "sergi_roberto.png",
                position_name: "Defence",
                kit_number: 20,
                weight: 68,
                height: 178,
                dominant_foot: "Right",
                shoot_accuracy: 70,
                salary: "1500000",
                date_of_birth: "02/07/1992",
                team: "Barcelona",
                agent: "Hakan Türkmenoğlu"
            }
        };

    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Player: {this.state.player.name}
                            </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="4" lg="1">
                                            <img src={"img/players/" + this.state.player.img} alt=""/>
                                        </Col>
                                        <Col xs="12" sm="8" lg="11">
                                            <Row>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.player.name}
                                                              mainText="Name" icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.player.position_name} mainText="Position Name"
                                                              icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.player.kit_number} mainText="Kit Number"
                                                              icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.player.dominant_foot} mainText="Dominant Foot" icon="fa fa-mixcloud"
                                                              color="secondary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={"$" + this.state.player.salary} mainText="Salary"
                                                              icon="fa fa-mixcloud" color="secondary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.player.team} mainText="Team" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={<Link to={"/agents/" + this.state.player.agent}>{this.state.player.agent}</Link>} mainText="Agent" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: "right"}}>
                                            <NavLink href="#/offers">
                                                <Button color="secondary">View Offers</Button>
                                            </NavLink>
                                            <NavLink href="#/makeOffer?username={this.state.player_name}">
                                                <Button color="secondary">Make Offer</Button>
                                            </NavLink>
                                        </Col>
                                    </Row>
                                </CardBody>
                        </Card>
                    </Col>
                </Row>
                <div className="card">
                    <div className="card-header">
                        Statistics
                    </div>
                    <div className="card-body">
                        <div className="bd-example">
                            <dl className="row">
                                <dt className="col-sm-2">Total goals</dt>
                                <dd className="col-sm-10">24</dd>
                                <dt className="col-sm-2">Total shoots</dt>
                                <dd className="col-sm-10">757</dd>
                                <dt className="col-sm-2">Total assists</dt>
                                <dd className="col-sm-10">43</dd>
                                <dt className="col-sm-2">Total yellow cards</dt>
                                <dd className="col-sm-10">123</dd>
                                <dt className="col-sm-2">Total red cards</dt>
                                <dd className="col-sm-10">24</dd>
                            </dl>
                        </div>
                    </div>
                </div>

            </div>)
    }
}

export default ViewPlayer;