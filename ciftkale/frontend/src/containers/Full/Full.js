import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';


// Datatable style
import 'react-table/react-table.css'

// Notifications
import Login from "../../views/Login";
import Register from "../../views/Register";
import ForgotPassword from "../../views/ForgotPassword";
import ListRealTeams from "../../views/Teams";
import ListRealLeagues from "../../views/Leagues";
import NewsStories from "../../views/News/NewsStories";
import NewsStory from "../../views/News/NewsStory";
import ChangeUsername from "../../views/ChangeUsername";
import ChangePassword from "../../views/ChangePassword";
import DeleteOwnAccount from "../../views/DeleteOwnAccount";
import ListRealPlayers from "../../views/Players";
import Page404 from "../../views/Page404";
import ViewTeam from "../../views/Team";
import ViewPlayer from "../../views/Player";
import ViewCoach from "../../views/Coach";
import ViewDirector from "../../views/Director";
import ChangePhoto from "../../views/ChangePhoto";
import ViewOffers from "../../views/Offers";
import ViewAgent from "../../views/Agent";
import NoAuthorization from "../../views/NoAuthorization";
import MakeOffer from "../../views/MakeOffer";
import MakeOfferTeam from "../../views/MakeOfferTeam";
import OffersToAccept from "../../views/OffersToAccept";
import Logout from "../../views/Logout";

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Container fluid>
              <Switch>
                <Route path="/login" name="Login" component={Login}/>
                <Route path="/register" name="Register" component={Register}/>
                <Route path="/404" name="Page404" component={Page404}/>
                <Route path="/401" name="NoAuthorization" component={NoAuthorization}/>
                <Route path="/forgotpassword" name="ForgotPassword" component={ForgotPassword}/>
                <Route path="/teams/:id" name="ViewTeam" component={ViewTeam}/>
                <Route path="/offers" name="ViewOffers" component={ViewOffers}/>
                <Route path="/makeoffer" name="MakeOffer" component={MakeOffer}/>
                <Route path="/offerstoaccept" name="OffersToAccept" component={OffersToAccept}/>
                <Route path="/makeofferteam" name="MakeOfferTeam" component={MakeOfferTeam}/>
                <Route path="/coaches/:id" name="ViewCoach" component={ViewCoach}/>
                <Route path="/agents/:id" name="ViewAgent" component={ViewAgent}/>
                <Route path="/directors/:id" name="ViewDirector" component={ViewDirector}/>
                <Route path="/teams" name="ListRealTeams" component={ListRealTeams}/>
                <Route path="/players/:id" name="ViewPlayer" component={ViewPlayer}/>
                <Route path="/players" name="ListRealPlayers" component={ListRealPlayers}/>
                <Route path="/leagues/:name"  name="ListRealLeagues" component={ListRealLeagues}/>
                <Route path="/leagues" name="ListRealLeagues" component={ListRealLeagues}/>
                <Route path="/news/:id" name="NewsStory" component={NewsStory}/>
                <Route path="/news" name="NewsStories" component={NewsStories}/>
                <Route path="/account/changephoto" component={ChangePhoto}/>
                <Route path="/account/changeusername" component={ChangeUsername}/>
                <Route path="/account/changepassword" component={ChangePassword}/>
                <Route path="/account/deleteownaccount" component={DeleteOwnAccount}/>
                <Route path="/account/logout" component={Logout}/>
                <Redirect from="/" to="/leagues"/>
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
          <Footer/>
      </div>
    );
  }
}

export default Full;
