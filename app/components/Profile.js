import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import userContainer from '../containers/userContainer';

class Profile extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { user } = this.props;
    console.log(user);
    let firstName = user.extraInfo.given_name;
      return (
        <View>
          <Text>Thanks for dropping in {firstName}!</Text>
          <Image
            style={{width: 50, height: 50}}
            source={{uri: user.picture}}
          />
        </View>
      );
  }

  updateUserInfo() {
    const { user } = this.props;
    let auth0Endpoint = `song-analyzer.auth0.com/api/users/${user.userId}`;
    fetch(auth0Endpoint, {
      method: "PATCH",
      body: `{ user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } }`,
    })
  }
}


  export default userContainer(Profile);


const styles = StyleSheet.create({

});
