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
const director = {
    name: "Orkun Alpar",
    img: "orkun.jpg",
    date_of_birth: "03/11/1996",
    team: "Arsenal",
    salary: 290000000
};
*/

class ViewDirector extends Component {


    componentWillMount() {
        axios.get("https://ciftkale.herokuapp.com/api/director", {
            params: {
                username: "Lopez" // this.props.match.params.id
            }
        }).then((response) => {
            console.log(response.data);
            this.setState({director: response.data});
        });
    }

    constructor(props) {
        super(props);


        console.log(props.match.params.id);

        this.state = {
            director: {
                full_name: "Orkun Alpar",
                img: "orkun.jpg",
                date_of_birth: "03/11/1996",
                club_name: "Arsenal",
                salary: 290000000
            }
        };

    }

    render() {

        return (<div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Director: {this.state.director.full_name}
                            </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="4" lg="2">
                                            <img style={{width: "200px", height: "200px"}} src={"img/directors/orkun.jpg"} alt=""/>
                                        </Col>
                                        <Col xs="12" sm="8" lg="10">
                                            <Row>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.director.full_name}
                                                              mainText="Name" icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.director.date_of_birth} mainText="Date of Birth"
                                                              icon="fa fa-wpexplorer" color="primary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={"$" + this.state.director.salary} mainText="Salary"
                                                              icon="fa fa-mixcloud" color="secondary"/>
                                                </Col>
                                                <Col xs="12" sm="6" lg="3">
                                                    <Widget02 header={this.state.director.club_name} mainText="Team" icon="fa fa-codiepie"
                                                              color="warning"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: "15px", textAlign: "right"}}>
                                        <Col>
                                            <NavLink href="#/offers">
                                                <Button color="secondary">View Offers made by {this.state.director.full_name}</Button>
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

export default ViewDirector;