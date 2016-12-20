import React, { Component } from 'react';
import { StyleSheet,
         Dimensions,
         Platform,
         Text,
         View,
         Switch,
         Navigator,
         TouchableHighlight } from 'react-native';
import Login from './Login';
import Search from './Search';
import SongList from './SongList';
import SongOverview from './SongOverview';
import SongDataVisualization from './SongDataVisualization';
import Profile from './Profile';

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ component: Login }}
        renderScene={(route, navigator) => {
          let RouteComponent = route.component;
          return (
            <View style={styles.container}>
              <RouteComponent
              {...route} navigator={navigator} />
            </View>
          )
        }}
        navigationBar={
        <Navigator.NavigationBar
          style={ styles.nav }
          routeMapper={NavigationBarRouteMapper} />
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

const routes = [
  { component: Login, title: 'Login'},
  { component: Profile, title: 'Profile'},
  { component: Search, title: 'Search' },
  { component: SongList, title: 'SongList' },
  { component: SongOverview, title: 'SongOverview' },
  { component: SongDataVisualization, title: 'SongDataVisualization' }
]

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 1 && route.title !== "Login") {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text style={styles.prevButton}>Prev</Text>
        </TouchableHighlight>
      )
    }
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
    let display;
    if(route.title !== "Profile" && route.__navigatorRouteID !== 0 && route.title !== "Login") {
      display = (
        <TouchableHighlight onPress={() => {
          navigator.push({
          title: 'Profile',
          component: Profile,
        })}}>
          <Text style={styles.prevButton}>Profile</Text>
        </TouchableHighlight>
      )
    }
    return display;
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.header }></Text>
  }
};

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      top: 50,
      backgroundColor: '#2E383F',
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 5,
      backgroundColor: '#2E383F',
      color: '#F9A828',
      width: width,
      height: 30,
    },
    dinoList: {
      padding: 5,
    },
})
