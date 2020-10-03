import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';

import {Images} from '../../Themes';

import Orientation from 'react-native-orientation-locker';

import {Camera, ControlPanel, CameraMask} from '../../Components/Camera';
import SettingsPanel from '../../Components/Camera/SettingsPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class CameraScreen extends Component {
  state = {orientation: 'PORTRAIT', showSlider: false};

  componentDidMount = () => {
    // Orientation.lockToPortrait();
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
    console.log(
      'App -> _addDeviceOrientationListener -> deviceOrientation',
      deviceOrientation,
    );
    this.setState({orientation: deviceOrientation});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Camera
        // ref={(ref) => {
        //   this.camera = ref;
        // }}
        >
          <SettingsPanel
            onSlidersPress={() => {
              if (this.state.showSlider) {
                this.setState({showSlider: false});
              } else {
                this.setState({showSlider: true});
              }
            }}
          />
          <CameraMask>
            <Image
              source={Images.grid}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </CameraMask>
          <ControlPanel showSlider={this.state.showSlider} />
        </Camera>
      </View>
    );
  }
}

export default CameraScreen;
