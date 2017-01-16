import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import SongDataVisualization from './SongDataVisualization';

class SongOverview extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { song } = this.props;
    return (
      <TouchableHighlight onPress={() => {this.openSongStats()}}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>{song.name}</Text>
          <Text style={styles.textArtist}>{song.artists[0].name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  openSongStats() {
    this.props.navigator.push({
      title: 'SongDataVisualization',
      component: SongDataVisualization,
      passProps: {
        id: this.props.song.id,
        song: this.props.song,
        navigator: this.props.navigator
      }
    });
  }

}

export default SongOverview;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#4f6c7e',
    borderWidth: 2,
    margin: 5,
    backgroundColor: '#07617D',
    borderRadius: 10
  },
  textTitle: {
    color: '#e0f1f9',
    fontSize: 20,
    fontFamily: 'helvetica',
    margin: 5,
  },
  textArtist: {
    color: '#F9A828',
    fontSize: 15,
    margin: 5,
  }
});
