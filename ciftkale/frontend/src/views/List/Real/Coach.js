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
import Widget02 from '../../Widgets/Widget02';

const qs = require('query-string');

const coach = {
    name: "Selim Fırat Yılmaz",
    img: "sfy.png",
    date_of_birth: "11/12/1996",
    team: "Barcelona",
    salary: 190000000,
    experience: "2 years"
};

class ViewCoach extends Component {


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Coach: {coach.name}
                            </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="4" lg="2">
                                            <img src={"img/coaches/" + coach.img} alt=""/>
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
                                                    <Widget02 header={coach.team} mainText="Team" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={coach.experience} mainText="Experience" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>)
    }
}

export default ViewCoach;