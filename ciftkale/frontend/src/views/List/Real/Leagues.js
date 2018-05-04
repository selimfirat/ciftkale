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
// const params = qs.parse(location.href.split("?")[1]);

const data = [
    {
        country: "England",
        name: "Premiere League",
        country_logo: "tr",
        total_budget: 1500000,
        total_teams: 32
    },
    {
        country: "Spanish",
        name: "Spanish League",
        country_logo: "es",
        total_budget: 500000,
        total_teams: 24
    }
];
let country = "";

const columns = [
    {
        Header: "League",
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
                Header: "Country",
                width: 150,
                filterable: true,
                filterAll: true,
                Filter: ({filter, onChange}) => {
                    setTimeout(onChange.bind(this, country), 1)
                    return (
                    <input
                        onChange={event => { onChange(event.target.value); country = event.target.value} }
                        value={ country }
                        style={{ width: '100%' }}
                    />)},
                Cell: (row) => ( <Link to={"/list/real/leagues?country=" + row.value}>{row.value}</Link>)

            },
            {
                accessor: 'name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/teams?league=" + row.value}>{row.value}</Link>)

            },
            {
                accessor: "total_teams",
                Header: "# of Teams",
                width: 100
            },
            {
                accessor: "total_budget",
                Header: "Total Budget",
                width: 200,
                Cell: (row) => ( "$" + row.value)
            }
        ]
    }
];

let params = {};

class ListRealLeagues extends Component {

    componentDidUpdate() {

        params = qs.parse(this.props.location.search);
        country = params.country ? params.country : "";
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Leagues List
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]}) }
                                    data={data}
                                    columns={columns}
                                    defaultPageSize={10}
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

export default ListRealLeagues;
