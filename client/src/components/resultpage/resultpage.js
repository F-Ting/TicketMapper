import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Label } from "reactstrap";
import Menu from "../../components/menu/menu";
import { connect } from "react-redux"
import * as user from "../../actions/userActions"
import * as result from "../../actions/resultActions"
import * as follow from "../../actions/followActions"
import "./resultpage.css"
import {Redirect } from "react-router-dom";

/*
Returns a list of attractions that match the keyword from the seach page.
Clicking on an attraction directs the user to the map page.
*/

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(user.sessionCheck());
    this.handleResult = this.handleResult.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.checkExists = this.checkExists.bind(this);
  }

  handleResult(keyword) {
    this.props.dispatch(result.fetchResult(keyword))
    this.props.history.push(`/mappage/`)
  }

  handleFollow(user, performerID, performer, userFollowing, eventCount) {
    var newUserFollowing = userFollowing.slice(0)
    newUserFollowing.push({ "performerID": performerID, "performer": performer, "upcomingEvents": eventCount })
    this.props.dispatch(follow.followPerformer(user, newUserFollowing))
  }

  handleUnfollow(user, performerID, userFollowing){
    var newAttractionList = userFollowing.filter(element => element.performerID !== performerID)
    this.props.dispatch(follow.followPerformer(user, newAttractionList))
}

  checkExists(userFollowing, attraction) {
    var loc = userFollowing.find(function(element){
        return element.performerID === attraction.performerID;
    });
    if (loc !== undefined) {
      return <Button color="danger" size="md" onClick={() => this.handleUnfollow(this.props.userName, attraction.performerID, this.props.userFollowing)}>Unfollow</Button>;
    }
    else{
      return <Button color="secondary" size="md" onClick={() => this.handleFollow(this.props.userName, attraction.performerID, attraction.performer, this.props.userFollowing, attraction.upcomingEvents)}>Follow</Button>;
    } 
  }

  render() {
    if (!this.props.loggedIn) {
       return <Redirect to='/'/>;
     }
    return (
      <div className="resultpage-container">
        <Menu />
        <div>
          {this.props.attractionList.length === 0 ? "loading..." :
            <Form>
              {Object.values(this.props.attractionList).map(function (attraction) {
                return (
                  <div className="resultpage-result" key={attraction.performerID}>
                    <Container>
                      <Row>
                        <Col xs="4">
                          <Label>{attraction.performer}</Label>
                        </Col>
                        <Col xs="4">
                          <Label>Upcoming Events: {attraction.upcomingEvents}</Label>
                        </Col>
                        <Col xs="2">
                          <Button color="primary" size="md" onClick={() => this.handleResult(attraction.performerID)}>View Map</Button>
                        </Col>
                        <Col xs="2">
                          {this.checkExists(this.props.userFollowing, attraction)}
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )
              }, this)}
            </Form>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  attractionList: state.search.attractionList,
  userName: state.user.userID,
  userFollowing: state.user.userFollowing,
  loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(ResultPage)
