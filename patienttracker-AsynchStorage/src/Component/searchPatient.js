import React, { Component } from 'react'

import {Item,Input, Segment,SwipeRow, Spinner, View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Right, Body, Title, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Addpatient } from '../Store/action/addpatient.js';


mapStateToProps = (state) => {

  console.log(state.AddPatientReducer.data, "component ma jo state arahe hai")
  return {
    patients: state.AddPatientReducer.data,
    getData: state.AddPatientReducer.getData
  }
}
class SearchPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  removePatient(i, data) {
    this.props.dispatch(Addpatient.removePatient(i, data))
    this.props.dispatch(Addpatient.fetchStorage())

    console.log(i, data, "iiiiiii,,,data data data")
  }

  render() {
    var x = this.props.patients;
    console.log(x, "xxxxxxxxxxx")
    return (
      <Container >
        <Header searchBar rounded style={style.title}>
          <Item>
            <Icon name="arrow-back" onPress={() => Actions.App()} />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content scrollEnabled={false}>
          {this.props.patients.map((val, i) =>
            <SwipeRow
              key={i}
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button full onPress={() => alert(
                  "NAME:  " + val.name + "\n" + "TREATMENT:  " + val.treatment + "\n" + "DISEASE:  " + val.disease
                )}>
                  <Icon active name="information-circle" />
                </Button>
              }
              body={
                <View>
                  <Text key={i}>         {val.name}</Text>
                </View>
              }
              right={
                <Button danger onPress={this.removePatient.bind(this, i, x)}>
                  <Icon active name="trash" />
                </Button>
              }
            />
          )}
        </Content>


       <Footer>
          <FooterTab style={style.footer}>
            <Body>
              <Segment style={style.footer}>
                <Button first><Text>BY date</Text></Button>
                <Button last active><Text>By Name</Text></Button>
              </Segment>
            </Body>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SearchPatient)
const style = {
  title: {
    backgroundColor: 'green'
  },
  footer: {
    backgroundColor: 'green'

  }
}
