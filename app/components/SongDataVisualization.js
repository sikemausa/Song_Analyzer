import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import songDataContainer from '../containers/songDataContainer';
import Graph from './Graph';
import base64 from 'base-64';
var audio = require('react-native').NativeModules.RNAudioPlayerURL;

class SongDataVisualization extends Component {
  constructor (props) {
    super(props);
    this.state = {
      audioPlaying: false
    };
  }

  componentWillMount() {
    this.authorizeSearch();
  }

  render() {
    console.log(this.props.passProps.song);
    let songData = this.props.songData.toJS();
    let display;
    if(this.props.songData.length === 0){
      display = <Text style={styles.text}>Sick beats, coming in hot</Text>;
    }
    if(this.props.songData.length !== 0 ){
      display = (
                  <View>
                    <Text>{this.props.passProps.song.name}</Text>
                    <Text>{this.props.passProps.song.artists[0].name}</Text>
                    <Button title='⏯'
                            onPress={() => this.toggleAudio()}>
                    </Button>
                    <View>
                      <View style={styles.graphContainer}>
                        <Graph
                          data={ Math.round(songData.danceability * 100)}
                          attribute ="Danceability"
                        />
                        <Graph
                          data={ Math.round((( 60 + songData.loudness ) * (100/60))) }
                          attribute ="Volume"
                        />
                      </View>
                      <View style={styles.graphContainer}>
                      <Graph
                        data={ Math.round(songData.energy * 100) }
                        attribute ="Energy"
                      />
                      <Graph
                        data={ Math.round(songData.speechiness * 100) }
                        attribute ="Speechiness"
                      />
                      </View>
                        <View style={styles.graphContainer}>
                        <Graph
                          data={ Math.round(songData.speechiness * 100) }
                          attribute ="Acousticness"
                        />
                        <Graph
                          data={ Math.round(songData.instrumentalness * 100) }
                          attribute ="Instrumentalness"
                        />
                        </View>
                        <View style={styles.graphContainer}>
                        <Graph
                          data={ Math.round(songData.valence * 100) }
                          attribute ="Valence"
                        />
                        <Graph
                          data={ Math.floor( (1 - ((240 - songData.tempo) / 240)) * 100) }
                          attribute ="Tempo"
                        />
                        </View>
                    </View>
                  </View>
                )
    }
        return (
          <View>
            {display}
          </View>
        )
  }

  toggleAudio() {
    if(this.state.audioPlaying === false) {
      audio.play();
      this.setState({audioPlaying: true});
    }
    if(this.state.audioPlaying === true) {
      audio.pause();
      this.setState({audioPlaying: false})
    }
  }

  authorizeSearch() {
    let authTokenEndpoint = 'https://accounts.spotify.com/api/token'
    let spotifyClientId = '91ef68d8a09e45218d1b72d3154ddf14';
    let spotifyClientSecret = '08de9b68a652445699879ab6e4aa8d0e';
    let encodedAuthorization = base64.encode(spotifyClientId + ":" + spotifyClientSecret);
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
    .then(responseJson => {
      this.searchApiForSongData(responseJson.access_token);
      this.searchApiForSongPreview(responseJson.access_token)
    });
  }

  searchApiForSongData(authToken) {
    const { id } = this.props.passProps.song;
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

  searchApiForSongPreview(authToken) {
    const { id } = this.props.passProps.song;
    let searchApiEndpoint = `https://api.spotify.com/v1/tracks/${id}`
    fetch(searchApiEndpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(responseJson => audio.initWithURL(responseJson.preview_url))
  }

}

  export default songDataContainer(SongDataVisualization);


const styles = StyleSheet.create({
    graphContainer: {
      flexDirection: 'row',
    },
    text: {
      top: 200,
      color: "#FFF",
      fontSize: 25,
    },
});
