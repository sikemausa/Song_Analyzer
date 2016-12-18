import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import songDataContainer from '../containers/songDataContainer';

class SongDataVisualization extends Component {
  constructor (props) {
   super(props);
   }

  componentWillMount() {
    this.authorizeSearch();
  }

  render() {
    const { songData } = this.props;
    return (
      <TouchableHighlight onPress={() => this.authorizeSearch()}>
        <Text>{ songData.danceability }</Text>
      </TouchableHighlight>
    )
  }

  authorizeSearch() {
    let authTokenEndpoint = 'https://accounts.spotify.com/api/token'
    let spotifyClientId = '91ef68d8a09e45218d1b72d3154ddf14';
    let spotifyClientSecret = '08de9b68a652445699879ab6e4aa8d0e'
    let encodedAuthorization = btoa(spotifyClientId + ":" + spotifyClientSecret);
    fetch(authTokenEndpoint, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        "Accept": "application/json",
        "Authorization": `Basic ${encodedAuthorization}`,
        "Content-Type" : "application/x-www-form-urlencoded",
      },
    })
    .then(response => response.json())
    .then(responseJson => this.searchApiForSongData(responseJson.access_token));
  }

  searchApiForSongData(authToken) {
    const { id } = this.props.passProps;
    const { getSongData } = this.props;
    let searchApiEndpoint = `https://api.spotify.com/v1/audio-features/${id}`
    fetch(searchApiEndpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(responseJson => getSongData(responseJson))
  }
}

  export default songDataContainer(SongDataVisualization);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  messageBox: {
    flex: 1,
    marginTop: 100,
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    top: 80,
  },
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
  ebook: {
    top: 95,
    left: 15,
    marginBottom: 10,
  },
  orderByNewest: {
    top: 55,
    left: 150,
    marginBottom: 10,
  },
  eBookLabel: {
    top: 50,
    left: 15,
    marginBottom: 10,
    fontSize: 12,
  },
  newestLabel: {
    top: 25,
    left: 150,
    marginBottom: 10,
    fontSize: 12,
  },
  callApiButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#1E77E2',
    borderWidth: 2,
    margin: 10,
    shadowColor: '#1b71E2',
    shadowRadius: 10,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiButtonLabel: {
    fontSize: 24,
  },
  scrollView: {
    top: 20,
    backgroundColor: '#1E77E2',
    height: 400
  },
});
