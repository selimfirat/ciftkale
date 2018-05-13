import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { Link } from 'react-router-dom'

const qs = require('query-string');

let team = "";
let country = "";

const data = [
    {
        team_logo: "barcelona.png",
        team: "Barcelona",
        country_logo: "es",
        country: "Spanish",
        player_img: "sergi_roberto.png",
        name: "Sergi Roberto",
        overall: 94

    }
];

const columns = [
    {
        Header: "Team",
        columns: [
            {
                accessor: 'team_logo',
                Header: ' ',
                width: 50,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/clubs/" + row.value} alt=""/>)
            },
            {
                accessor: 'team',
                Header: 'Name',
                filterable: true,
                Filter: ({filter, onChange}) => {
                    setTimeout(onChange.bind(this, team), 1);
                    return (
                        <input
                            onChange={event => { onChange(event.target.value); team = event.target.value} }
                            value={ team }
                            style={{ width: '100%' }}
                        />)},
                Cell: (row) => ( <Link to={"/list/real/teams/" + row.value}>{row.value}</Link>),
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
                Cell: (row) => (<i className={"flag-icon flag-icon-" + row.value}></i>)
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
                Cell: (row) => ( <Link to={"/list/real/players/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: 'overall',
                Header: 'Overall',
                width: 100,
            }
        ]
    },
];


class ListRealPlayers extends Component {


    componentDidUpdate() {
        const params = qs.parse(this.props.location.search);

        team = params.team ? params.team : "";
        country = params.country ? params.country : "";
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Players
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    data={data}
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
            </div>

        )
    }
}

export default ListRealPlayers;
