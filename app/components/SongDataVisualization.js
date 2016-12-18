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
    let display;
    if(this.props.songData.length === 0){
      display = <Text>Data loading: Please wait</Text>;
    }
    if(this.props.songData.length !== 0 ){
      display =
              <View>
                <View style={styles.graphContainer}>
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.danceability * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.danceability * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  {/* <Text>Danceability: { songData.danceability }</Text> */}
                  <AnimatedCircularProgress
                  //edit calculations
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.loudness * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.danceability * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                </View>
                <View style={styles.graphContainer}>
                  {/* <Text>Loudness: { songData.loudness }</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.energy * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.energy * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  {/* <Text>Energy: { songData.energy}</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.speechiness * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.speechiness * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  </View>
                  <View style={styles.graphContainer}>
                  {/* <Text>Speechiness: { songData.speechiness }</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.acousticness * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.acousticness * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  {/* <Text>Acousticness: { songData.acousticness }</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.instrumentalness * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.instrumentalness * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  </View>
                  <View style={styles.graphContainer}>
                  {/* <Text>Instrumentalness: { songData.instrumentalness }</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.valence * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.valence * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  {/* <Text>Valence: { songData.valence }</Text> */}
                  <AnimatedCircularProgress
                    style={styles.graph}
                    size={100}
                    width={20}
                    fill={ (songData.tempo * 100) }
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                      (fill) => (
                        <Text style={styles.points}>
                          { Math.round(songData.tempo * 100) }
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  {/* <Text>Tempo: { songData.tempo }</Text> */}
                </View>
              </View>
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
      color: '#7591af',
      fontSize: 35,
      fontWeight: "100"
    },
    graphContainer: {
      flexDirection: 'row',
    },
    graph: {
      margin: 10,
    }
});
