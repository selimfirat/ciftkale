import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';

import Colors from '../../views/Theme/Colors/';
import Typography from '../../views/Theme/Typography/';

import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Base
import Cards from '../../views/Base/Cards/';
import Forms from '../../views/Base/Forms/';
import Switches from '../../views/Base/Switches/';
import Tables from '../../views/Base/Tables/';
import Tabs from '../../views/Base/Tabs/';
import Breadcrumbs from '../../views/Base/Breadcrumbs/';
import Carousels from '../../views/Base/Carousels/';
import Collapses from '../../views/Base/Collapses/';
import Dropdowns from '../../views/Base/Dropdowns/';
import Jumbotrons from '../../views/Base/Jumbotrons/';
import ListGroups from '../../views/Base/ListGroups/';
import Navbars from '../../views/Base/Navbars/';
import Navs from '../../views/Base/Navs/';
import Paginations from '../../views/Base/Paginations/';
import Popovers from '../../views/Base/Popovers/';
import ProgressBar from '../../views/Base/ProgressBar/';
import Tooltips from '../../views/Base/Tooltips/';

// Buttons
import Buttons from '../../views/Buttons/Buttons/';
import ButtonDropdowns from '../../views/Buttons/ButtonDropdowns/';
import ButtonGroups from '../../views/Buttons/ButtonGroups/';
import SocialButtons from '../../views/Buttons/SocialButtons/';

// Datatable style
import 'react-table/react-table.css'


// Icons
import Flags from '../../views/Icons/Flags/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';

// Notifications
import Alerts from '../../views/Notifications/Alerts/';
import Badges from '../../views/Notifications/Badges/';
import Modals from '../../views/Notifications/Modals/';
import Login from "../../views/Login";
import Register from "../../views/Register";
import ForgotPassword from "../../views/ForgotPassword/ForgotPassword";
import ListRealTeams from "../../views/List/Real/Teams";
import ListRealLeagues from "../../views/List/Real/Leagues";
import NewsStories from "../../views/News/NewsStories";
import NewsStory from "../../views/News/NewsStory";
import ChangeUsername from "../../views/Base/Account/ChangeUsername";
import ChangePassword from "../../views/Base/Account/ChangePassword";
import DeleteOwnAccount from "../../views/Base/Account/DeleteOwnAccount";
import ListRealPlayers from "../../views/List/Real/Players";
import Page404 from "../../views/Page404/Page404";
import ViewTeam from "../../views/List/Real/Team";
import ViewPlayer from "../../views/List/Real/Player";
import ViewCoach from "../../views/List/Real/Coach";
import ViewDirector from "../../views/List/Real/Director";
import ChangePhoto from "../../views/Base/Account/ChangePhoto";
import ViewOffers from "../../views/List/Real/Offers";
import ViewAgent from "../../views/List/Real/Agent";
import NoAuthorization from "../../views/Page404/NoAuthorization";
import MakeOffer from "../../views/MakeOffer/MakeOffer";
import MakeOfferTeam from "../../views/MakeOffer/MakeOfferTeam";
import OffersToAccept from "../../views/List/Real/OffersToAccept";

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
              <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/theme/colors" name="Colors" component={Colors}/>
                <Route path="/theme/typography" name="Typography" component={Typography}/>
                <Route path="/base/cards" name="Cards" component={Cards}/>
                <Route path="/base/forms" name="Forms" component={Forms}/>
                <Route path="/base/switches" name="Swithces" component={Switches}/>
                <Route path="/base/tables" name="Tables" component={Tables}/>
                <Route path="/base/tabs" name="Tabs" component={Tabs}/>
                <Route path="/base/breadcrumbs" name="Breadcrumbs" component={Breadcrumbs}/>
                <Route path="/base/carousels" name="Carousels" component={Carousels}/>
                <Route path="/base/collapses" name="Collapses" component={Collapses}/>
                <Route path="/base/dropdowns" name="Dropdowns" component={Dropdowns}/>
                <Route path="/base/jumbotrons" name="Jumbotrons" component={Jumbotrons}/>
                <Route path="/base/list-groups" name="ListGroups" component={ListGroups}/>
                <Route path="/base/navbars" name="Navbars" component={Navbars}/>
                <Route path="/base/navs" name="Navs" component={Navs}/>
                <Route path="/base/paginations" name="Paginations" component={Paginations}/>
                <Route path="/base/popovers" name="Popovers" component={Popovers}/>
                <Route path="/base/progress-bar" name="Progress Bar" component={ProgressBar}/>
                <Route path="/base/tooltips" name="Tooltips" component={Tooltips}/>
                <Route path="/buttons/buttons" name="Buttons" component={Buttons}/>
                <Route path="/buttons/button-dropdowns" name="ButtonDropdowns" component={ButtonDropdowns}/>
                <Route path="/buttons/button-groups" name="ButtonGroups" component={ButtonGroups}/>
                <Route path="/buttons/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/icons/flags" name="Flags" component={Flags}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/notifications/alerts" name="Alerts" component={Alerts}/>
                <Route path="/notifications/badges" name="Badges" component={Badges}/>
                <Route path="/notifications/modals" name="Modals" component={Modals}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Route path="/login" name="Login" component={Login}/>
                <Route path="/register" name="Register" component={Register}/>
                <Route path="/404" name="Page404" component={Page404}/>
                <Route path="/401" name="NoAuthorization" component={NoAuthorization}/>
                <Route path="/forgotpassword" name="ForgotPassword" component={ForgotPassword}/>
                <Route path="/list/real/teams/:id" name="ViewTeam" component={ViewTeam}/>
                <Route path="/list/real/offers" name="ViewOffers" component={ViewOffers}/>
                <Route path="/makeoffer" name="MakeOffer" component={MakeOffer}/>
                <Route path="/offerstoaccept" name="OffersToAccept" component={OffersToAccept}/>
                <Route path="/makeofferteam" name="MakeOfferTeam" component={MakeOfferTeam}/>
                <Route path="/list/real/coaches/:id" name="ViewCoach" component={ViewCoach}/>
                <Route path="/list/real/agents/:id" name="ViewAgent" component={ViewAgent}/>
                <Route path="/list/real/directors/:id" name="ViewDirector" component={ViewDirector}/>
                <Route path="/list/real/teams" name="ListRealTeams" component={ListRealTeams}/>
                <Route path="/list/real/players/:id" name="ViewPlayer" component={ViewPlayer}/>
                <Route path="/list/real/players" name="ListRealPlayers" component={ListRealPlayers}/>
                <Route path="/list/real/leagues/:name"  name="ListRealLeagues" component={ListRealLeagues}/>
                <Route path="/list/real/leagues" name="ListRealLeagues" component={ListRealLeagues}/>
                <Route path="/news/:id" name="NewsStory" component={NewsStory}/>
                <Route path="/news" name="NewsStories" component={NewsStories}/>
                <Route path="/account/changephoto" component={ChangePhoto}/>
                <Route path="/account/changeusername" component={ChangeUsername}/>
                <Route path="/account/changepassword" component={ChangePassword}/>
                <Route path="/account/deleteownaccount" component={DeleteOwnAccount}/>
                <Redirect from="/" to="/dashboard"/>
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
