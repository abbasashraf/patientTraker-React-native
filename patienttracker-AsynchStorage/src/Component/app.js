import React, { Component } from 'react'

import { Item, Input, SwipeRow, Spinner, View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Right, Body, Title, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Addpatient } from '../Store/action/addpatient.js';
import DatePicker from 'react-native-datepicker'




mapStateToProps = (state) => {

  console.log(state.AddPatientReducer.data, "component ma jo state arahe hai")
  return {
    patients: state.AddPatientReducer.data,
    getData: state.AddPatientReducer.getData
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbar: true,
      datesearch: true,
      search: "",
      date: ""

    }
    console.log(this.state.date, 'this.state.date')
  }

  removePatient(i, data) {
    this.props.dispatch(Addpatient.removePatient(i, data))
    this.props.dispatch(Addpatient.fetchStorage())
    console.log(i, data, "iiiiiii,,,data data data")
  }
  removeAll() {
    this.props.dispatch(Addpatient.removeAllPatients())
  }

  searcOpt() {
    this.setState({
      searchbar: false
    })
    console.log(this.state.searchbar, 'this.state.searchbar')
  }
  searcOpt1() {
    this.setState({
      searchbar: true
    })
    console.log(this.state.searchbar, 'this.state.searchbar')
  }
  searcOpt3() {
    this.setState({
      datesearch: this.state.datesearch ? false : true
    })
  }


  findByDate = (patients) => {
    date = patients.date;
    return date.search(this.state.date) >= 0 ? true : false
  }



  findByName = (patients) => {
    name = patients.name;
    return name.search(this.state.search) >= 0 ? true : false
  }





  render() {
    console.log(this.findByDate, "findByDate findByDate findByDate")
    console.log(this.findByName, "findbyname findbyname findbyname", )

    console.log(this.state.search, 'this.state.search')
    console.log(this.state.date, 'this.state.search')
    var x = this.props.patients;
    var date = new Date;
    console.log(x, "xxxxxxxxxxx")
    return (
      <Container >
        {this.state.searchbar ?
          <Header style={style.title}>
            <Body >
              <Title >Patient Tracker</Title>
            </Body>

            <Right>
              <Button transparent onPress={this.searcOpt.bind(this)}>
                <Icon name="ios-search" />
              </Button>
              <Button transparent onPress={this.searcOpt3.bind(this)}>
                <Icon name="ios-grid" />
              </Button>
            </Right>
          </Header> :
          <Header searchBar rounded style={style.title}>
            <Item>
              <Icon name="arrow-back" onPress={this.searcOpt1.bind(this)} />
              <Input placeholder="Search"
                value={this.state.search}
                onChange={(e) => {
                  this.setState({
                    search: e.nativeEvent.text
                  })
                }} />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        }


        {this.state.datesearch ? <View></View> :
          <DatePicker
            style={style.date}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD/M/YYYY"
            minDate={date}
            maxDate="2019-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ date: date, }) }}
          />}


        {!this.props.getData ? <Content>

          <Spinner color='green' />

        </Content> :

          <Content>

            {!this.state.datesearch ? <Content scrollEnabled={false}>
              {this.props.patients.filter(this.findByDate).map((val, i) =>
                <SwipeRow
                  key={i}
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  left={
                    <Button full onPress={() => alert(
                      "NAME:  " + val.name + "\n" + "TREATMENT:  " + val.treatment + "\n" + "DISEASE:  " + val.disease + '\n' + "DATE:  " + val.date
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
            </Content> :
              <Content scrollEnabled={false}>
                {this.props.patients.filter(this.findByName).map((val, i) =>
                  <SwipeRow
                    key={i}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                      <Button full onPress={() => alert(
                        "NAME:  " + val.name + "\n" + "TREATMENT:  " + val.treatment + "\n" + "DISEASE:  " + val.disease + '\n' + "DATE:  " + val.date
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
            }
          </Content>}

        <Button block danger onPress={this.removeAll.bind(this)}>
          <Text>Remove All</Text>
        </Button>



        <Footer >
          <FooterTab style={style.footer}>
            <Button vertical onPress={() => Actions.AddPatient()}>
              <Icon name="person" />
              <Text>Add patient</Text>
            </Button>

          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(App)
const style = {
  title: {
    backgroundColor: 'green'
  },
  footer: {
    backgroundColor: 'green'
  },
  date: {
    width: 360,
    marginLeft: 20
  }

}
