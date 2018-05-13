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
import axios from 'axios';

const qs = require('query-string');
// const params = qs.parse(location.href.split("?")[1]);


const requestData = (page, pageSize, sortInfo, filterInfo) => {
    let params = {
        'page': page,
        'pageSize': pageSize,
    };
    

    for (let info of sortInfo) {
        if (info.id === 'country') {
            params['sortCountry'] = info.desc;
        } else if (info.id === 'name') {
            params['sortLeague'] = info.desc;
        }
    }
    
    for (let info of filterInfo) {
        if (info.id === 'country') {
            params['filterCountry'] = info.value;
        } else if (info.id === 'name') {
            params['filterLeague'] = info.value;
        }
    }

    return axios.get('http://ciftkale.herokuapp.com/api/leagues', { params: params });
};

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
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchNewData = this.fetchNewData.bind(this);
    }


    fetchNewData(state, instance) {
        console.log('yeter ulan');
        this.setState({ loading: true });

        requestData(
            state.page,
            state.pageSize,
            state.sorted,
            state.filtered
        ).then(res => {
            this.setState({
                data: res.data.data,
                pages: res.data.num_pages,
                loading: false
            });
        });
    }

    render() {
        const {data, pages, loading} = this.state;

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
                                    // defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]}) }
                                    data={data}
                                    manual
                                    filterable
                                    pages={pages}
                                    loading={loading}
                                    columns={columns}
                                    onFetchData={this.fetchNewData}
                                    defaultPageSize={10}
                                    className="-striped -highlight"
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
