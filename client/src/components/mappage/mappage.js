import React, { Component } from "react";
import { Button,Container, Row, Col } from "reactstrap";
import EventsList from "./eventsList/eventsList";
import MapContainer from "./map/map";
import { connect } from "react-redux"
import Menu from "../../components/menu/menu";
import "./mappage.css"
import * as user from "../../actions/userActions"
import {Redirect } from "react-router-dom";

/*
Once an attraction is clicked in the results page,
user is directed to map with locations for all upcoming events of that attraction.
The data is displayed on a Google Map as well as a scrollable list.
*/

class MapPage extends Component {

  constructor(props){
    super(props);
    this.props.dispatch(user.sessionCheck());
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.history.push(`/resultpage/`)
  }

  render() {
    if (!this.props.loggedIn) {
       return <Redirect to='/'/>;
     }
    return (
      <div className="mappage-container">
        <Menu />
        <Button className="btn-block btn-md" color="primary" onClick={this.handleBack}>Back To Results</Button>{' '}

        <Container fluid={true}>
          <Row>
            <Col className="mappage-list" xs="4">
              {this.props.ready === 0 ?
                "Loading..." :
                <EventsList dispatch = {this.props.dispatch} history={this.props.history} performer={this.props.performer} events={this.props.events} performerID={this.props.performerID} />}
            </Col>
            <Col className="mappage-map" xs="8">
              {this.props.ready === 0 ?
                "Loading..." :
                <MapContainer events={this.props.events} />}
            </Col>
          </Row>
          <div className="mappage-map-responsive">
            <Row>
              {this.props.ready === 0 ?
                "Loading..." :
                <MapContainer events={this.props.events} />}
            </Row>
          </div>
          <div className="mappage-list-responsive">
            <Row>
              {this.props.ready === 0 ?
                "Loading..." :
                <EventsList dispatch = {this.props.dispatch} history={this.props.history} performer={this.props.performer} events={this.props.events} performerID={this.props.performerID} />}
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps =(state) => ({
  events: state.result.eventList,
  performer: state.result.performer,
  performerID: state.result.performerID,
  ready: 1,
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(MapPage)
