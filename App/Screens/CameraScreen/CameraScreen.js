import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import Orientation from 'react-native-orientation-locker';

import {Camera} from '../../Components/Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class CameraScreen extends Component {
  state = {orientation: 'PORTRAIT', showSlider: false};

  componentDidMount = () => {
    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(
      this._addDeviceOrientationListener,
    );
  };

  componentWillUnmount = () => {
    Orientation.removeDeviceOrientationListener(
      this._addDeviceOrientationListener,
    );
  };

  _addDeviceOrientationListener = (deviceOrientation) => {
    this.setState({orientation: deviceOrientation});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Camera />
      </View>
    );
  }
}

export default CameraScreen;
