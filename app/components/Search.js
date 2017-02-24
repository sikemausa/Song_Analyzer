import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import songsContainer from '../containers/songsContainer';
import SongList from './SongList';

class Search extends Component{
  constructor (props) {
   super(props)
   this.state = {
     searchTerm: null,
   };
   }

   render() {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
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
          <TouchableHighlight>
            <Text style={styles.text}>Search for sick beats!</Text>
          </TouchableHighlight>
          <View style={styles.container}>
            <TouchableHighlight
              style={{ alignSelf: 'center' }}
              onPress={() => this.searchApiForSongs()}>
              <Text style={styles.searchButton}>Search</Text>
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
        if(responseJson.tracks.items.length === 1) {
          Alert.alert(
            `Right on!`,
            `Your search returned ${responseJson.tracks.items.length} sick beat`);
          return this.props.navigator.push({
            title: 'SongList',
            component: SongList,
          });
          }
        if(responseJson.tracks.items.length > 1) {
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

export default songsContainer(Search)

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
    backgroundColor: "#ECECEB",
    borderRadius: 5,
    paddingLeft: 10,
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
    borderRadius: 25,
    height: 40,
    width: 120,
    backgroundColor: '#07617D',
    top: 275,
    borderColor: '#4f6c7e',
    borderWidth: 2,
  },
  searchButton: {
    color: '#FFFFFF',
    transform:[{translateY: 8}],
    textAlign: 'center',
    fontSize: 15,
    width: 120,
    height: 40
  },
});
