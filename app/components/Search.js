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
          <TextInput
            style={styles.form}
            placeholder={'Search'}
            onChangeText={(text) => this.setState({searchTerm: text})}
            value={this.state.subject}
            >
          </TextInput>
          <TouchableHighlight
            onPress={() => this.searchApiForSongs()}>
            <Text>Search for songs</Text>
          </TouchableHighlight>
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

const styles = StyleSheet.create({
  form: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    top: 85,
    padding: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
});
