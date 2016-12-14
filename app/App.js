import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight } from 'react-native';
import Login from './Login';

export default class App extends Component {

  state = {
    horizontalIsOn: false,
  };

  render() {
    return (
      <Navigator
        initialRoute={{ component: Login, title: 'Please Log In' }}
        renderScene={(route, navigator) => {
          let RouteComponent = route.component;
          return (
            <View style={styles.container}>
              <Text style={styles.header}>{route.title}</Text>
              <RouteComponent {...route} navigator={navigator} />
            </View>
          )
        }}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      top: 50,
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
