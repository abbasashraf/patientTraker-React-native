import React, { Component } from 'react'

import { View, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Right, Body, Title, Form, Item, Input, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Addpatient } from '../Store/action/addpatient.js';
import DatePicker from 'react-native-datepicker'

class AddPatient extends Component {
  constructor(props) {
    super(props)
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var d = d.getDate();
    var date = d + "/" + m + "/" + y;
    this.state = {
      name: '',
      disease: '',
      treatment: '',
      date: date
    };
  }


  handleOnSubmit() {
    var patient = {};
    patient.name = this.state.name;
    patient.disease = this.state.disease;
    patient.treatment = this.state.treatment;
    patient.date = this.state.date;
    // console.log(patient);
    this.props.dispatch(Addpatient.addStorage(patient));

    this.setState({
      name: '',
      disease: '',
      treatment: ''
    })
  }

  render() {
    var date = new Date;
    return (
      <Container>
        <Header style={style.title}>

          <Left>
            <Button transparent onPress={() => Actions.App()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Patient Tracker</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={style.inputStyle} >
            <Item floatingLabel >
              <Label>Patient Name</Label>
              <Input value={this.state.name} onChange={ev => this.setState({ name: ev.nativeEvent.text })} />
            </Item>
            <Item floatingLabel>
              <Label>Disease</Label>
              <Input value={this.state.disease} onChange={ev => this.setState({ disease: ev.nativeEvent.text })} />
            </Item>
            <Item floatingLabel>
              <Label>Treatment</Label>
              <Input value={this.state.treatment} onChange={ev => this.setState({ treatment: ev.nativeEvent.text })} />
            </Item>
          </Form>

          <Content style={style.date}>
            <DatePicker
              showIcon={true}
              style={{ width: 300 }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD/M/YYYY"
              minDate={date}
              maxDate="2018-06-01"
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
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
          </Content>

        </Content>
        <Footer>
          <FooterTab style={style.footer}>

            <Button vertical active
              onPress={() => {
                this.handleOnSubmit.call(this)
                Actions.App()

              }}
              style={style.footer}>
              <Icon active name="paper" />
              <Text>Save Patient</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

const style = {
  inputStyle: {
    marginLeft: 20,
    marginTop: 20,
    width: 320,
    // color: 'green'


  }, title: {
    backgroundColor: 'green'
  },
  footer: {
    backgroundColor: 'green'

  },
  date: {

    marginLeft: 40,
    marginTop: 40,
    width: 300
  }
}

export default connect()(AddPatient);
