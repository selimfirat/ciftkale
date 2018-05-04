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

const team = {
    name: "Barcelona",
    league: "Liga BBVA",
    short_name: "BAR",
    logo: "barcelona.png",
    date_of_foundation: "11/122/1950",
    stadium: "Camp Nou",
    budget: "195000",
    players: [
        {
            team_logo: "barcelona.png",
            team: "Barcelona",
            country_logo: "es",
            country: "Spanish",
            player_img: "sergi_roberto.png",
            name: "Sergi Roberto",
            overall: 94

        }
    ],
    coach: "Ernesto Valverde",
    director: "Josep Maria Bartomeu i Floreta"
};

let league = "";
let team_filter = team.name;
let country = ""

const columns = [
    {
        Header: "Team",
        columns: [
            {
                accessor: 'logo',
                Header: ' ',
                width: 50,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/" + row.value} alt=""/>)
            },
            {
                accessor: 'team',
                Header: 'Name',
                filterable: true,
                Filter: ({filter, onChange}) => {
                    setTimeout(onChange.bind(this, team_filter), 1);
                    return (
                        <input
                            onChange={event => { onChange(event.target.value); team_filter = event.target.value} }
                            value={ team_filter }
                            style={{ width: '100%' }}
                        />)},
                Cell: (row) => ( <Link to={"/list/real/players?team=" + row.value}>{row.value}</Link>),
                filterAll: true,

            }
        ]
    },
    {
        Header: "Player",
        columns: [

            {
                accessor: "country_logo",
                Header: " ",
                width: 50,
                sortable: false,
                Cell: (row) => (<i className={"flag-icon flag-icon-" + row.value}/>)
            },
            {
                accessor: "country",
                Header: "Nation",
                width: 150,
                filterable: true,
                Filter: ({filter, onChange}) => {
                    setTimeout(onChange.bind(this, country), 1)
                    return (
                        <input
                            onChange={event => { onChange(event.target.value); country = event.target.value} }
                            value={ country }
                            style={{ width: '100%' }}
                        />)},
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/players?country=" + row.value}>{row.value}</Link>)

            },
            {
                accessor: "player_img",
                Header: " ",
                width: 50,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/players/" + row.value} alt=""/>)
            },
            {
                accessor: 'name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/players?league=" + row.value}>{row.value}</Link>)
            },
            {
                accessor: 'overall',
                Header: 'Overall',
                width: 100,
            }
        ]
    },
];


class ViewTeam extends Component {


    render(props) {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> { team.name }
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="4" lg="2">
                                        <img src={"img/clubs/" + team.logo} alt=""/>
                                    </Col>

                                    <Col xs="12" sm="8" lg="10">
                                        <Row>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.name + "(" + team.short_name + ")"} mainText="Team Name" icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.league} mainText="League Name" icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.date_of_foundation} mainText="Date of Foundation" icon="fa fa-wpexplorer" color="primary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.stadium} mainText="Stadium" icon="fa fa-mixcloud" color="secondary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={"$" + team.budget} mainText="Transfer Budget" icon="fa fa-mixcloud" color="secondary"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.coach} mainText="Coach" icon="fa fa-codiepie" color="warning"/>
                                            </Col>
                                            <Col xs="12" sm="6" lg="3">
                                                <Widget02 header={team.director} mainText="Director" icon="fa fa-codiepie" color="warning"/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{textAlign: "right"}}>
                                        <Button color="primary">Make Offer</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Players
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    data={team.players}
                                    columns={columns}
                                    defaultPageSize={10}
                                    defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]}) }
                                    className="-striped -highlight"
                                    defaultSorted={[
                                        {
                                            id: "name",
                                            asc: true
                                        }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Sponsors
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="0" sm="0" lg="0.5" />

                                    <Col xs="12" sm="6" lg="3">
                                        <img src="img/sponsors/new_balance.jpg" width="100%" alt=""/>
                                    </Col>
                                    <Col xs="0" sm="0" lg="1" />
                                    <Col xs="12" sm="6" lg="3">
                                        <img src="img/sponsors/pepsi.png" width="100%" alt=""/>
                                    </Col>
                                    <Col xs="0" sm="0" lg="1" />
                                    <Col xs="12" sm="6" lg="3">
                                        <img src="img/sponsors/toyota.jpg" width="100%" alt=""/>
                                    </Col>
                                    <Col xs="0" sm="0" lg="0.5" />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default ViewTeam;
