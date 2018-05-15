import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    NavLink
} from 'reactstrap';
import axios from 'axios';

class OffersToAccept extends Component {

    componentWillMount() {
        axios.get("https://ciftkale.herokuapp.com/api/offers", {
            params: {
                director: localStorage["username"]
            }
        }).then((response) => {
            this.setState({offers: response.data.receivedOffers })
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            offers: [{
                offerer: "Barcelona's Director Alper Şahıstan",
                offered_money: "$90M",
                offered_players: ["Sergi Roberto", "Alper Şahıstan"],
                players_in_return: ["Selim Fırat Yılmaz", "Hakan Türkmenoğlu"],
            },
            {
                offerer: "Barcelona's Director Alper Şahıstan",
                offered_money: "$90M",
                offered_players: ["Sergi Roberto", "Alper Şahıstan"],
                players_in_return: ["Selim Fırat Yılmaz", "Hakan Türkmenoğlu"],
            }]
        };
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    { this.state.offers.map(function (offer) {

                        return (<Col xs="12" sm="6">
                            <Card>
                                <CardHeader>
                                    <strong>Offer</strong>
                                </CardHeader>
                                <CardBody>
                                    <dl className="row">
                                        <dt className="col-sm-4">Offer From</dt>
                                        <dd className="col-sm-8">{offer.offerer}</dd>
                                        <dt className="col-sm-4">Offered Money</dt>
                                        <dd className="col-sm-8">{offer.offered_money}</dd>
                                        <dt className="col-sm-4">Offered Player(s)</dt>
                                        <dd className="col-sm-8">{offer.offered_players.map(e =>  (<p>{e}</p>)) }</dd>
                                        <dt className="col-sm-4">Your player(s) in Return</dt>
                                        <dd className="col-sm-8">{offer.players_in_return.map(e => <p> {e} </p>) }</dd>
                                    </dl>
                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Accept</Button>
                                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Decline</Button>
                                </CardFooter>
                            </Card>
                        </Col> )
                    })
                }
                </Row>
            </div>)
    }
}

export default OffersToAccept;
