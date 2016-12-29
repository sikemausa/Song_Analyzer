import React, { Component } from 'react';
import { TextInput,
         StyleSheet,
         Image,
         Dimensions,
         Text,
         View,
         Switch,
         TouchableHighlight
       } from 'react-native';
import userContainer from '../containers/userContainer';
import tokenContainer from '../containers/tokenContainer';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0('https://song-analyzer.auth0.com');
import Login from './Login';

class Profile extends Component {
  constructor (props) {
   super(props);
      let user = this.props.user.toJS();
      let defaultName = user.extraInfo.given_name;
      let editedName = user.userMetadata.name;
    this.state = {
      name: editedName || defaultName,
      isEditing: false,
    };
   }

  render() {
    let user = this.props.user.toJS();
    let token = this.props.user.toJS();
    let firstName = user.extraInfo.given_name;
    let display;
    if(this.state.isEditing){
      display = (
        <TextInput
        style={styles.nameText}
        value={this.state.name}
        onChangeText={(text) => this.setState({name: text})}
        />
      )
    }
    if(!this.state.isEditing) {
      display = (
        <Text style={styles.edittingText}>{this.state.name}</Text>
      )
    }
      return (
        <View>
          <View style={styles.profile}>
            <Text style={styles.title}>Thanks for dropping in {this.state.name}!</Text>
            <Image
              style={styles.image}
              source={{uri: user.picture}}
            />
          <View>
          {display}
          <View style={{margin: 15}}>
          <Switch
            style={{alignSelf: 'center'}}
            onValueChange={value => this.handleEditSwitch(value)}
            value={this.state.isEditing}
          />
          <Text style={{textAlign: "center"}}>Toggle to edit name</Text>
          </View>
          </View>
          <View style={styles.container}>
            <TouchableHighlight
              style={{alignItems: 'center'}}
              onPress={() => this.login()}>
              <Text style={styles.button}
                onPress={() => this.logOut()}>Log Out</Text>
            </TouchableHighlight>
            </View>
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

let { width } = Dimensions.get(`window`);
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
    textAlign: "center",
  },
  button: {
      color: '#FFFFFF',
      transform:[{translateY: 8}],
      textAlign: 'center',
      fontSize: 15,
  },
  container: {
    borderRadius: 25,
    height: 40,
    width: 150,
    backgroundColor: '#07617D',
    top: 0,
    borderColor: '#4f6c7e',
    borderWidth: 2,
    alignSelf: 'center'
  },
  edittingText: {
    alignSelf: 'center',
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center"
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 24,
    color: "red",
    width: width,
    height: 30,
    textAlign: "center"
  },
});
