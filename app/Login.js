import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight } from 'react-native';

export default class Login extends Component {

  state = {
    horizontalIsOn: false,
  };

  render() {
    return (
      <View>
        <Text>Hello There!</Text>
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
