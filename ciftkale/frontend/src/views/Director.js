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

const director = {
    name: "Orkun Alpar",
    img: "orkun.jpg",
    date_of_birth: "03/11/1996",
    team: "Arsenal",
    salary: 290000000
};

class ViewDirector extends Component {


    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Director: {director.name}
                            </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="4" lg="2">
                                            <img style={{width: "200px", height: "200px"}} src={"img/directors/" + director.img} alt=""/>
                                        </Col>
                                        <Col xs="12" sm="8" lg="10">
                                            <Row>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={director.name}
                                                              mainText="Name" icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={director.date_of_birth} mainText="Date of Birth"
                                                              icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={"$" + director.salary} mainText="Salary"
                                                              icon="fa fa-mixcloud" color="secondary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={director.team} mainText="Team" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "15px", textAlign: "right"}}>
                                        <Col>
                                            <Button color="secondary">View Offers made by {director.name}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>)
    }
}

export default ViewDirector;