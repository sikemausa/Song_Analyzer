import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import userContainer from '../containers/userContainer';
import tokenContainer from '../containers/tokenContainer';

class Profile extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { user, token } = this.props;
    let firstName = user.extraInfo.given_name;
    console.log(this.props);
      return (
        <View>
            <Text>Thanks for dropping in {firstName}!</Text>
          {/* <Image
            style={{width: 50, height: 50}}
            source={{uri: user.picture}}
          /> */}
        </View>
      );
  }

  // updateUserInfo() {
  //   const { user } = this.props;
  //   let auth0Endpoint = `song-analyzer.auth0.com/api/users/${user.userId}`;
  //   fetch(auth0Endpoint, {
  //     method: "PATCH",
  //     body: `{ user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } }`,
  //     Content-Type
  //   })
  // }
}


  export default tokenContainer(userContainer(Profile));


const styles = StyleSheet.create({

});
