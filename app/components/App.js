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
              <Text style={styles.header}>{route.title}</Text>
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
    if(index > 0) {
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
    if(route.title !== "Profile") {
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
    if(route.title === "Profile" || route.__navigatorRouteID === 0){
      display = (
        <Text>{null}</Text>
      )
    }
    return display;
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.navTitle }>Sick Beats</Text>
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
      color: '#F9A828'
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
