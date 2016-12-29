import React, { Component } from 'react';
import { StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
import Auth0Lock from 'react-native-lock';
let credentials = require('../../auth0-credentials');
let lock = new Auth0Lock(credentials);
import userContainer from '../containers/userContainer';
import tokenContainer from '../containers/tokenContainer';
import Search from './Search';

class Login extends Component {
  constructor (props) {
   super(props);
    this.state={
      profile: null,
      id: null,
    };
   }

  render() {
    return (
      <View>
      <Image
        style={{width: width, height: height }}
        source={require('../../Assets/music.png')}
      />
      <View style={styles.container}>
        <TouchableHighlight
          style={{alignItems: 'center'}}
          onPress={() => this.login()}>
          <Text style={styles.loginButton}>Log In</Text>
        </TouchableHighlight>
        </View>
      </View>
    )
  }

  login() {
    const { getUser, getToken } = this.props;
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      getToken(token);
      getUser(profile);
      this.props.navigator.push({
        title: 'Search',
        component: Search,
        passProps: {
          navigator: this.props.navigator
        }
      });
    });
  }
}

export default tokenContainer(userContainer(Login));

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
  loginButton: {
    color: '#FFFFFF',
    transform:[{translateY: 8}],
    textAlign: 'center',
    fontSize: 15,
    height: 40,
    width: 110,
  },
  container: {
    borderRadius: 25,
    height: 40,
    width: 110,
    backgroundColor: '#07617D',
    transform:[{translateY: -300}],
    borderColor: '#4f6c7e',
    borderWidth: 2,
    alignSelf: 'center',
  }
})
