import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight } from 'react-native';
import Auth0Lock from 'react-native-lock';
let credentials = require('../auth0-credentials');
let lock = new Auth0Lock(credentials);

export default class Login extends Component {

  state = {
    horizontalIsOn: false,
  };

  onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.navigator.push({
        name: 'Profile',
        passProps: {
          profile: profile,
          token: token,
        }
      });
    });
  }

  render() {
    return (
      <View>
        <View>
          <Text>Auth0 Example</Text>
          <Text>Identity made simple for Developers</Text>
        </View>
        <TouchableHighlight
          underlayColor='#949494'
          onPress={this.onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

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
