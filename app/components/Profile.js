import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import userContainer from '../containers/userContainer';
import tokenContainer from '../containers/tokenContainer';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0('https://song-analyzer.auth0.com');

class Profile extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { user, token } = this.props;
    console.log(this.props);
    let firstName = user.extraInfo.given_name;
      return (
        <View>
          <TouchableHighlight onPress={() => this.updateUserInfo()}>
          <Text>Thanks for dropping in {firstName}!</Text>
          </TouchableHighlight>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: user.picture}}
          />
        </View>
      );
  }

  updateUserInfo() {
    const { user, token } = this.props;
    auth0.users(`${token.idToken}`)
    .patch(`${user.userId}`, {'first_name': 'John', 'last_name': 'Doe'})
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }
}


  export default tokenContainer(userContainer(Profile));


const styles = StyleSheet.create({

});
