import React, { Component } from 'react'

import { Item, Input, SwipeRow, Spinner, View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Right, Body, Title, List, ListItem } from 'native-base';
import firebase from '../firebase'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Addpatient } from '../Store/action/addpatient.js';
import DatePicker from 'react-native-datepicker'




mapStateToProps = (state) => {

  console.log(state.AddPatientReducer.data, "component ma jo state arahe hai")
  return {
    patients: state.AddPatientReducer.data,
    getData: state.AddPatientReducer.getData,
    key: state.AddPatientReducer.key
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchbar: true,
      datesearch: true,
      search: "",
      date: "",
      //  key: []

    }
    console.log(this.state.date, 'this.state.date')
  }

  // removePatient(i) {
  //   this.props.dispatch(Addpatient.removePatient(i))
  //   // this.props.dispatch(Addpatient.fetchStorage())
  // }
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
      searchbar: true,
      search: ""
    })
    console.log(this.state.searchbar, 'this.state.searchbar')
  }
  searcOpt3() {
    this.setState({
      datesearch: this.state.datesearch ? false : true,
      date: false ? "" : this.state.search
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
  componentDidMount() {
    var getData = firebase.database().ref("patients/");
    getData.on('value', snap => {
      var userObj = snap.val();
      if (userObj != null) {
        var key = Object.keys(userObj);
        this.setState({
          key
        })

      }
    })

  }

  removePatient(i) {

    var indexValue = this.state.key[i]
    firebase.database().ref('patients/' + indexValue).remove();
    // this.props.dispatch(Addpatient.removedPatient())
    // this.props.dispatch(Addpatient.fetchStorage());

  }



  render() {
    console.log(this.findByDate, "findByDate findByDate findByDate")
    console.log(this.findByName, "findbyname findbyname findbyname", )
    console.log(this.state.search, 'this.state.search')
    console.log(this.state.date, 'this.state.search')
    //var key = this.props.key;
    var x = this.props.patients;
    console.log(x, "sara data jo state ma se araha hai")
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
            minDate="2016-06-01"
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


        {!this.props.getData ?
          <Content style={style.spinner}>
            <Spinner color='green' />
            <Text >     Loading...</Text>
          </Content> :
           
            <Content scrollEnabled={false}>
            {this.props.patients.filter(this.findByName).filter(this.findByDate).map((val, i) =>
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
                  <Button key={i} danger onPress={this.removePatient.bind(this, i)}>
                    <Icon active name="trash" />
                  </Button>
                }
              />
            )}
          </Content>}

        {!this.props.getData ? <View></View> :
          <Button block danger onPress={this.removeAll.bind(this)}>
            <Text>Remove All</Text>
          </Button>
        }





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
  },
  spinner: {
    width: 100,
    marginTop: 200,
    marginLeft: 130
  }

}
