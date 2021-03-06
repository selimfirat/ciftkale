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
import Widget02 from './Widgets/Widget02';
import axios from 'axios';

const qs = require('query-string');

let league = "";
let country = "";

/*
const data = [
    {
        logo: "arsenal.png",
        country: "England",
        name: "Arsenal",
        short_name: "ARS",
        league: "Premiere League",
        country_logo: "tr",
        budget: 1500000,
        coach: "Hakan Türkmenoğlu",
        director: "Alper Şahıstan",
        standing: 1
    },
    {
        logo: "barcelona.png",
        country: "Spanish",
        name: "Barcelona",
        short_name: "BAR",
        league: "Spanish League",
        country_logo: "es",
        budget: 500000,
        coach: "Orkun Alpar",
        director: "Selim Fırat Yılmaz",
        standing: 1
    }
];
*/

const requestData = (page, pageSize, sortInfo, filterInfo) => {
    let params = {
        'page': page,
        'pageSize': pageSize,
        'sortInfo': JSON.stringify(sortInfo)
    };

    let filterMap = {
        'country': 'filterCountry',
        'league': 'filterLeague',
        'name': 'filterTeam',
        'coach': 'filterCoach',
        'director': 'filterDirector',
        'standing': 'filterStanding'
    }

    for (let info of filterInfo) {
        let filterName = filterMap[info.id];
        if (filterName) {
            params[filterName] = info.value;
        }
    }

    return axios.get('https://ciftkale.herokuapp.com/api/clubs', { params: params });
};

const columns = [
    {
        Header: "League",
        columns: [
            {
                accessor: "country_logo",
                Header: " ",
                width: 50,
                sortable: false,
                filterable: false,
                Cell: (row) => (<i className={"flag-icon flag-icon-" + row.value}/>)
            },
            {
                accessor: "standing",
                Header: "Standing",
                width: 80,
                sortable: true,
                filterable: true
            },
            {
                accessor: "country",
                Header: "Country",
                width: 150,
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/teams?country=" + row.value}>{row.value}</Link>)

            },
            {
                accessor: 'league',
                Header: 'Name',
                width: 200,
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/teams?league=" + row.value}>{row.value}</Link>)
            }
        ]
    },
    {
        Header: "Team",
        columns: [
            {
                accessor: 'logo',
                Header: ' ',
                width: 50,
                sortable: false,
                filterable: false,
                Cell: (row) => (<img style={{width: "24px", height: "24px" }} src={"img/clubs/" + row.value} alt=""/>)
            },
            {
                accessor: 'short_name',
                Header: ' ',
                width: 100,
                filterable: true,
                filterAll: true
            },
            {
                accessor: 'name',
                Header: 'Name',
                filterable: true,
                filterAll: true,
                Cell: (row) => (<Link to={"/teams/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: "coach",
                Header: "Coach",
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/coaches/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: "director",
                Header: "Director",
                filterable: true,
                filterAll: true,
                Cell: (row) => ( <Link to={"/directors/" + row.value}>{row.value}</Link>)
            },
            {
                accessor: "budget",
                Header: "Budget",
                width: 200,
                Cell: (row) => ( "$" + row.value)
            }
        ]
    },
];

let params = {};
class ListRealTeams extends Component {

    constructor(props){
        super(props);
        params = qs.parse(props.location.search);

        league = params.league ? params.league : "";
        country = params.country ? params.country : "";

        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.fetchNewData = this.fetchNewData.bind(this);
    }

    componentDidUpdate() {
        params = qs.parse(this.props.location.search);

        league = params.league ? params.league : "";
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

            let flags = ["tr", "ec", "es", "it", "et", "fi", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc"];
            let data = res.data.res.map(rows => ({
                    standing: rows[0],
                    country: rows[1],
                    league: rows[2],
                    name: rows[3],
                    coach: rows[4],
                    director: rows[5],
                    budget: rows[6],
                    short_name: rows[7],
                    country_logo: flags[Math.floor(Math.random()*flags.length)] // herkes Türk hocam
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
              { params.league &&
              <Row>
                  <Col>
                      <Card>
                          <CardHeader>
                              <i className="fa fa-align-justify"></i> { league }
                          </CardHeader>
                          <CardBody>
                              <Row>
                                  <Col xs="12" sm="6" lg="3">
                                      <Widget02 header={league} mainText="League Name" icon="fa fa-wpexplorer" color="primary"/>
                                  </Col>
                                  <Col xs="12" sm="6" lg="3">
                                      <Widget02 header="2017 Spring" mainText="Current Season" icon="fa fa-mixcloud" color="secondary"/>
                                  </Col>
                                  <Col xs="12" sm="6" lg="3">
                                      <Widget02 header="England" mainText="Country" icon="fa fa-codiepie" color="warning"/>
                                  </Col>
                              </Row>
                          </CardBody>
                      </Card>
                  </Col>
              </Row>
              }

              <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Clubs List
                  </CardHeader>
                  <CardBody>
                      <ReactTable
                          columns={columns}
                          defaultPageSize={10}
                          data={data}
                          manual
                          filterable
                          pages={pages}
                          loading={loading}
                          onFetchData={this.fetchNewData}
                          //defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]}) }
                          className="-striped -highlight"
                      />
                  </CardBody>
                </Card>
              </Col>
            </Row>
              { params.league &&
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
              }

          </div>

        )
      }
}

export default ListRealTeams;
