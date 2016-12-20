import React, { Component } from 'react';
import { TextInput, createFragment, StyleSheet, Image, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import userContainer from '../containers/userContainer';
import tokenContainer from '../containers/tokenContainer';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0('https://song-analyzer.auth0.com');
import Login from './Login';
import moment from 'moment';

class Profile extends Component {
  constructor (props) {
   super(props);
    const { user } = this.props;
      let defaultName = user.extraInfo.given_name;
      let editedName = user.userMetadata.name;
    this.state = {
      name: editedName || defaultName,
      isEditing: false,
    };
   }

  render() {
    const { user, token } = this.props;
    let firstName = user.extraInfo.given_name;
    let display;
    if(this.state.isEditing){
      display = (
        <TextInput
        style={{ width: 100, height: 40 }}
        value={this.state.name}
        onChangeText={(text) => this.setState({name: text})}
        />
      )
    }
    if(!this.state.isEditing) {
      display = (
        <Text>{this.state.name}</Text>
      )
    }
      return (
        <View>
          <View style={styles.profile}>
            <Text style={styles.title}>Thanks for dropping in {firstName}!</Text>
            <Image
              style={styles.image}
              source={{uri: user.picture}}
            />
          <View>
          <Text>Name: </Text>
          {display}
          <View>
          <Switch
            onValueChange={value => this.handleEditSwitch(value)}
            value={this.state.isEditing}
          />
          </View>
          </View>
          <Button
            style={styles.button}
            onPress={() => this.logOut()}
            title="Log Out"
            color="#15aebd"
          />
          </View>
          </View>
      );
  }

  handleEditSwitch(value) {
    this.setState({isEditing: value});
    this.updateUserInfo();
  }

  logOut() {
    this.props.navigator.push({
      title: 'Login',
      component: Login,
      passProps: {
        navigator: this.props.navigator
      }
    });
  }

  updateUserInfo() {
    const { user, token } = this.props;
    auth0.users(`${token.idToken}`)
    .patch(`${user.userId}`, {'name': this.state.name})
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }
}


  export default tokenContainer(userContainer(Profile));


const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profile: {
     height: 500,
     alignItems: 'center',
     justifyContent: 'space-between',
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
    color: '#FFFFFF',
  },
  button: {
    top: -20,
  },
});
