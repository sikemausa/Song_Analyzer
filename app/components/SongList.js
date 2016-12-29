import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import songsContainer from '../containers/songsContainer';
import SongOverview from './SongOverview';

class SongList extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { navigator } = this.props;
    let songs = this.props.songs.toJS();

    return (
      <ScrollView
        style={styles.scrollView}>
        {songs.tracks.items.map(function(song, i) {
          return <SongOverview key={i} song={song} navigator={navigator} />}
        )}
      </ScrollView>
    )
  }
}

let { height, width } = Dimensions.get(`window`);
const styles = StyleSheet.create({
  scrollView: {
    top: 10,
    height: height,
    width: (width - 20),
  },
});


export default songsContainer(SongList);
