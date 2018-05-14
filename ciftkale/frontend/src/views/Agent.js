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
const coach = {
    name: "Hakan Türkmenoğlu",
    img: "hakan.jpg",
    date_of_birth: "15/09/1996",
    team: "Barcelona",
    salary: 190000000,
    player: "Sergi Roberto"
};
*/
class ViewAgent extends Component {

    componentWillMount() {
        axios.get("https://ciftkale.herokuapp.com/api/agent/", {
            params: {
                name: this.props.match.params.id
            }
        }).then((response) => {
            this.setState({player: response.data})
        });
    }

    constructor(props) {
        super(props);


        console.log(props.match.params.id);

        this.state = {
            agent: {
                name: "Hakan Türkmenoğlu",
                img: "hakan.jpg",
                date_of_birth: "15/09/1996",
                team: "Barcelona",
                salary: 190000000,
                players: ["Sergi Roberto", "Webner Şahıstan"]
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
                                <i className="fa fa-align-justify"></i> Agent: {this.state.agent.name}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="4" lg="2">
                                        <img src={"img/agents/" + this.state.agent.img} alt=""/>
                                    </Col>
                                    <Col xs="12" sm="8" lg="10">
                                        <Row>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={this.state.agent.name}
                                                          mainText="Name" icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={this.state.agent.date_of_birth} mainText="Date of Birth"
                                                          icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={"$" + this.state.agent.salary} mainText="Salary"
                                                          icon="fa fa-mixcloud" color="secondary"/>
                                            </Col>
                                            {this.state.agent.players.map(function (player) {
                                                return (
                                                    <Col xs="12" sm="6" lg="3">
                                                        <Widget02 header={<Link to={"/players/" + player}>{player}</Link>} mainText="Player" icon="fa fa-codiepie" color="warning"/>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "15px", textAlign: "right"}}>
                                    <Col>
                                        <NavLink href="#/offers">
                                            <Button color="secondary">View Offers made to players of {this.state.agent.name}</Button>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>)
    }
}

export default ViewAgent;