import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  ScrollView,
  Row,
  Image,
  Dimensions,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import songsContainer from '../containers/songsContainer';
import userContainer from '../containers/userContainer';
import SongList from './SongList';

class Search extends Component{
  constructor (props) {
   super(props)
   this.state = {
     searchTerm: null,
   };
   }

   render() {
     const { user } = this.props;
      return (
        <View>
        <Image
          style={styles.image}
          source={require('../../Assets/note.png')}
        />
          <TextInput
            style={styles.form}
            placeholder={'Search'}
            onChangeText={(text) => this.setState({searchTerm: text})}
            value={this.state.subject}
            >
          </TextInput>
          <TouchableHighlight
            onPress={() => this.searchApiForSongs()}>
            <Text style={styles.text}>Search for sick beats!</Text>
          </TouchableHighlight>
          <View style={styles.container}>
            <TouchableHighlight
              style={{alignItems: 'center'}}
              onPress={() => this.searchApiForSongs()}>
              <Text style={styles.loginButton}>Search</Text>
            </TouchableHighlight>
            </View>
        </View>
      )
    }

  searchApiForSongs() {
    const { getSongs, songs } = this.props;
    if(this.state.searchTerm === '' || this.state.searchTerm === null) {
      return Alert.alert(
        `Whoops!`,
        `Looks like you didn't enter a search term`);
    }
    else {
      let searchApiEndpoint = `https://api.spotify.com/v1/search?q=${this.state.searchTerm}&type=track,artist&limit=50`
      fetch(searchApiEndpoint, {
        method: "GET"
      })
      .then(response => response.json())
      .then(responseJson => { getSongs(responseJson);
        if(responseJson.tracks.items.length > 0) {
          Alert.alert(
            `Right on!`,
            `Your search returned ${responseJson.tracks.items.length} sick beats`);
          return this.props.navigator.push({
            title: 'SongList',
            component: SongList,
          });
          }
        return Alert.alert(
          `Bummer!`,
          `Looks like your search didn't return any sick beats`
        )
        });
    }
  }

}

export default songsContainer(userContainer(Search))

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
  form: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    top: 300,
    padding: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#ECECEB"
  },
  text: {
    fontSize: 25,
    color: "#ECECEB",
    alignSelf: 'center',
  },
  image: {
    position: 'absolute',
    width: 150,
    height: 150,
    left: 80,
    top: 110,
  },
  container: {
    position: 'absolute',
    borderRadius: 25,
    height: 40,
    width: 150,
    backgroundColor: '#000000',
    top: 375,
    left: 80,
    borderColor: '#F9A828',
    borderWidth: 2,
    alignSelf: 'center'
  },
  loginButton: {
    color: '#F9A828',
    transform:[{translateY: 8}],
    textAlign: 'center',
    fontSize: 15,
  },
});
