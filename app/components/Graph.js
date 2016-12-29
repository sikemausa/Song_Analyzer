import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Graph extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { data, attribute } = this.props;
    return (
      <View style={styles.column}>
        <AnimatedCircularProgress
          rotation={0}
          style={styles.graph}
          size={100}
          width={20}
          fill={data}
          tintColor="#07617D"
          backgroundColor="#2a2a2a">
          {
            (fill) => (
              <Text style={styles.points}>
                {data}
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <Text style={styles.text}>{attribute}</Text>
      </View>
    )
  }
}

export default Graph;

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
      fontWeight: "100",
      color: '#F9A828',
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
