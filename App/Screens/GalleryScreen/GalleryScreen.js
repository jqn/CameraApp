import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import {GridList} from '../../Components/Gallery';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class GalleryScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <GridList />
      </View>
    );
  }
}

export default GalleryScreen;
