import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { Link } from 'react-router-dom'
import Widget02 from './Widgets/Widget02';

const qs = require('query-string');

const coach = {
    name: "Hakan Türkmenoğlu",
    img: "hakan.jpg",
    date_of_birth: "15/09/1996",
    team: "Barcelona",
    salary: 190000000,
    player: "Sergi Roberto"
};

class ViewAgent extends Component {


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Agent: {coach.name}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="4" lg="2">
                                        <img src={"img/agents/" + coach.img} alt=""/>
                                    </Col>
                                    <Col xs="12" sm="8" lg="10">
                                        <Row>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={coach.name}
                                                          mainText="Name" icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={coach.date_of_birth} mainText="Date of Birth"
                                                          icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={"$" + coach.salary} mainText="Salary"
                                                          icon="fa fa-mixcloud" color="secondary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={<Link to={"/list/real/players/" + coach.player}>{coach.player}</Link>} mainText="Player" icon="fa fa-codiepie"
                                                          color="warning"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={<Link to={"/list/real/players/" + coach.player}>{"Webner Şahıstan"}</Link>} mainText="Player" icon="fa fa-codiepie"
                                                          color="warning"/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "15px", textAlign: "right"}}>
                                    <Col>
                                        <Button color="secondary">View Offers made to players of {coach.name}</Button>
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