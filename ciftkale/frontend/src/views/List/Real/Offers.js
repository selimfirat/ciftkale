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
import Widget02 from '../../Widgets/Widget02';

const qs = require('query-string');

let league = "";
let country = "";
let player = "";
let team = "";

const data = [
    {
        to_logo: "barcelona.png",
        to_name: "Barcelona",
        to_agent: "Hakan Türkmenoğlu",
        from_director: "Alper Şahıstan",
        from_name: "Arsenal",
        from_logo: "arsenal.png",
        status: "Pending",
        offer: "$19M + Volkan Demirel",
        player: "Sabri Sarığlu, Hasan Şaş",
        date: "2018-01-20"
    },
    {
        to_logo: "barcelona.png",
        to_name: "Barcelona",
        to_agent: "Hakan Türkmenoğlu",
        from_director: "Alper Şahıstan",
        from_name: "Arsenal",
        from_logo: "arsenal.png",
        status: "Accepted",
        offer: "$43M",
        player: "Mesut Özil",
        date: "2018-01-13"
    }
];

const columns = [
    {
        Header: "From Club",
        columns: [
            {
                accessor: 'from_logo',
                Header: ' ',
                width: 50,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/clubs/" + row.value} alt=""/>)
            },
            {
                accessor: 'from_name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/teams/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: "from_director",
                Header: "Director",
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/directors/" + row.value}>{row.value}</Link>)
            }
        ]
    },
    {
        Header: "To Club",
        columns: [
            {
                accessor: 'to_logo',
                Header: ' ',
                width: 50,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/clubs/" + row.value} alt=""/>)
            },
            {
                accessor: 'to_name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/teams/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: 'to_agent',
                Header: 'Agent',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/list/real/agents/" + row.value}>{row.value}</Link>)
            },
        ]
    },
    {
        Header: "Offer Info",
        columns: [
            {
                accessor: 'player',
                Header: 'Player(s)',
                filterable: true,
                Filter: ({filter, onChange}) => {
                    setTimeout(onChange.bind(this, player), 1);
                    return (
                        <input
                            onChange={event => { onChange(event.target.value); team = event.target.value} }
                            value={ team }
                            style={{ width: '100%' }}
                        />)},
                Cell: (row) => ( <Link to={"/list/real/offers?player=" + row.value}>{row.value}</Link>),
                filterAll: true,
            },
            {
                accessor: "offer",
                Header: "Offer",
                width: 200,
                Cell: (row) => ( row.value)
            },
            {
                accessor: "status",
                id: "over",
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    if (filter.value === "true") {
                        return row[filter.id] >= 21;
                    }
                    return row[filter.id] < 21;
                },
                filterable: true,
                filterAll: true,
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                    >
                        <option value="all">All</option>
                        <option value="accepted">Accepted</option>
                        <option value="pending">Pending</option>
                        <option value="declined">Declined</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
            },
            {
                accessor: "date",
                Header: "Date",
                width: 200
            },
        ]
    }

];

let params = {};
class ViewOffers extends Component {

    constructor(props){
        super(props);
        params = qs.parse(props.location.search);

        league = params.league ? params.league : "";
        country = params.country ? params.country : "";
    }

    componentDidUpdate() {
        params = qs.parse(this.props.location.search);

        league = params.league ? params.league : "";
        country = params.country ? params.country : "";
    }

    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Transfer Offers
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
                                            id: "date",
                                            desc: true
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

export default ViewOffers;
