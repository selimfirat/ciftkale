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

let team = "";
let country = "";

/*
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
*/

const columns = [
    {
        Header: "Team",
        columns: [
            {
                accessor: 'team_logo',
                Header: ' ',
                width: 50,
                filterable: false,
                sortable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/clubs/" + row.value} alt=""/>)
            },
            {
                accessor: 'team',
                Header: 'Name',
                filterable: true,
                Cell: (row) => ( <Link to={"/teams/" + row.value}>{row.value}</Link>),
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
                filterable: false,
                Cell: (row) => (<i className={"flag-icon flag-icon-" + row.value}></i>)
            },
            {
                accessor: "country",
                Header: "Nation",
                width: 150,
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/players?country=" + row.value}>{row.value}</Link>)

            },
            {
                accessor: "player_img",
                Header: " ",
                width: 50,
                sortable: false,
                filterable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/players/" + row.value} alt=""/>)
            },
            {
                accessor: 'name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/players/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: 'overall',
                Header: 'Overall',
                width: 100,
            }
        ]
    },
];

const requestData = (page, pageSize, sortInfo, filterInfo) => {
    let params = {
        'page': page,
        'pageSize': pageSize,
        'sortInfo': JSON.stringify(sortInfo)
    };

    let filterMap = {
        'country': 'filterCountry',
        'name': 'filterPlayer',
        'team': 'filterTeam',
        'overall': 'filterOverall'
    }

    for (let info of filterInfo) {
        let filterName = filterMap[info.id];
        if (filterName) {
            params[filterName] = info.value;
        }
    }

    return axios.get('https://ciftkale.herokuapp.com/api/players', { params: params });
};


class ListRealPlayers extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchNewData = this.fetchNewData.bind(this);
    }

    componentDidUpdate() {
        const params = qs.parse(this.props.location.search);

        team = params.team ? params.team : "";
        country = params.country ? params.country : "";
    }

    fetchNewData(state, instance) {
        this.setState({ loading: true });

        requestData(
            state.page,
            state.pageSize,
            state.sorted,
            state.filtered
        ).then(res => {
            console.log(res);

            let data = res.data.res.map(rows => ({
                    team: rows[0],
                    country: rows[1],
                    name: rows[2] + ' ' + rows[3],
                    overall: rows[4],
                    country_logo: "tr" // herkes Türk hocam
                })
            );

            this.setState({
                data: data,
                pages: Math.ceil(res.data.num_rows / state.pageSize),
                loading: false
            });
        });
    }

    render() {
        const {pages, data, loading} = this.state;

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
                                    manual
                                    filterable
                                    pages={pages}
                                    loading={loading}
                                    columns={columns}
                                    defaultPageSize={10}
                                    onFetchData={this.fetchNewData}
                                    //defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]}) }
                                    className="-striped -highlight"
                                    defaultSorted={[
                                        {
                                            id: "name",
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

export default ListRealPlayers;
