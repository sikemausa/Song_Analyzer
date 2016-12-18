import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight } from 'react-native';
import Auth0Lock from 'react-native-lock';
let credentials = require('../../auth0-credentials');
let lock = new Auth0Lock(credentials);
import userContainer from '../containers/userContainer';
import Search from './Search';
import Profile from './Profile';

class Login extends Component {
  constructor (props) {
   super(props);
   }

  login() {
    const { getUser } = this.props;
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      getUser(profile);
      console.log(token);
      this.props.navigator.push({
        title: 'Search',
        component: Search,
        passProps: {
          navigator: this.props.navigator
        }
      });
    });
  }

  render() {
    const { user } = this.props;
    let display;
    if(user.length === 0){
      display = (
        <View>
          <View>
          </View>
          <TouchableHighlight
            underlayColor='#949494'
            onPress={() => this.login()}>
            <Text>Log in</Text>
          </TouchableHighlight>
        </View>
      );
    }
    if(user.length !== 0){
      display = (
        <Profile />
      )
    }
    return (
      <View>
        {display}
      </View>
    )
  }
}

export default userContainer(Login);

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: 15,
    },
    navLink: {
      fontSize: 16,
      fontWeight: '900',
      textAlign: 'center',
      marginBottom: 50,
      color: '#1d9758'
    },
    header: {
      fontSize: 24,
      fontWeight: '900',
      textAlign: 'center',
      marginBottom: 5,
    },
    dinoList: {
      padding: 5,
    },
})
