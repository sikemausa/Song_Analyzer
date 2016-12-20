import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import songDataContainer from '../containers/songDataContainer';
import Graph from './Graph';

class SongDataVisualization extends Component {
  constructor (props) {
   super(props);
   }

  componentWillMount() {
    this.authorizeSearch();
  }

  render() {
    let songData = this.props.songData.toJS();
    let display;
    if(this.props.songData.length === 0){
      display = <Text style={ { top: 200, color: "#FFF", fontSize: 25 } }>Sick beats, coming in hot</Text>;
    }
    if(this.props.songData.length !== 0 ){
      display = (
                  <View>
                  <Text style ={{alignSelf: "center"}}>Insert Song name here</Text>
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
                )
    }
        return (
          <View>
            {display}
          </View>
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
    points: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 30,
      left: 15,
      width: 70,
      textAlign: 'center',
      fontSize: 35,
      fontWeight: "100",
    },
    graphContainer: {
      flexDirection: 'row',
    },
    graph: {
      margin: 10,
    },
    column: {
      flexDirection: 'column',
      marginLeft: 15,
      marginRight: 15,
    },
    text: {
      textAlign: 'center',
      color: '#F9A828'
    }
});
