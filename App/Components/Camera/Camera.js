import React, {useRef, useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';

import {RNCamera} from 'react-native-camera';

import {Images} from '../../Themes';

import SettingsPanel from './SettingsPanel';
import CameraMask from './CameraMask';
import ControlPanel from './ControlPanel';

const styles = StyleSheet.create({
  preview: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  grid: {
    width: '100%',
    height: '100%',
  },
});

const IS_IOS = Platform.OS === 'ios';
// const touchCoordsSize = 100 * conf.theme.variables.sizeScaling;

const flashIcons = {
  on: 'flash',
  auto: 'flash-auto',
  off: 'flash-off',
  torch: 'flashlight',
};

const MAX_ZOOM = 8; // iOS only
const ZOOM_F = IS_IOS ? 0.01 : 0.1;
const BACK_TYPE = RNCamera.Constants.Type.back;
const FRONT_TYPE = RNCamera.Constants.Type.front;

const WB_OPTIONS = [
  RNCamera.Constants.WhiteBalance.auto,
  RNCamera.Constants.WhiteBalance.sunny,
  RNCamera.Constants.WhiteBalance.cloudy,
  RNCamera.Constants.WhiteBalance.shadow,
  RNCamera.Constants.WhiteBalance.incandescent,
  RNCamera.Constants.WhiteBalance.fluorescent,
];

const WB_OPTIONS_MAP = {
  0: 'WB',
  1: 'SU',
  2: 'CL',
  3: 'SH',
  4: 'IN',
  5: 'FL',
  6: 'CW',
};

const CUSTOM_WB_OPTIONS_MAP = {
  temperature: {label: 'Temp.', min: 1000, max: 10000, steps: 500},
  tint: {label: 'Tint', min: -20, max: 20, steps: 0.5},
  redGainOffset: {label: 'Red', min: -1.0, max: 1.0, steps: 0.05},
  greenGainOffset: {label: 'Green', min: -1.0, max: 1.0, steps: 0.05},
  blueGainOffset: {label: 'Blue', min: -1.0, max: 1.0, steps: 0.05},
};

const Camera = ({children}) => {
  let cameraRef = useRef(null);

  let [type, setType] = useState('back');
  let [flash, setFlash] = useState('off');
  let [sliders, setSliders] = useState(false);

  const toggleCameraType = () => {
    if (type === 'back') {
      setType('front');
    } else {
      setType('back');
    }
  };

  const toggleFlash = () => {
    if (flash === 'torch') {
      setFlash('off');
    } else if (flash === 'off') {
      setFlash('auto');
    } else if (flash === 'auto') {
      setFlash('on');
    } else if (flash === 'on') {
      setFlash('torch');
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const toggleSliders = () => {
    if (sliders) {
      setSliders(false);
    } else {
      setSliders(true);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        captureAudio={false}
        type={type}
        flashMode={flash}>
        <SettingsPanel
          onFlashPress={toggleFlash}
          onSlidersPress={toggleSliders}
          flashIcon={flashIcons[flash]}
        />
        <CameraMask>
          <Image source={Images.grid} style={styles.grid} resizeMode="cover" />
        </CameraMask>
        <ControlPanel
          onCameraSwitchPress={toggleCameraType}
          onCapturePress={takePicture}
          showSlider={sliders}
        />
      </RNCamera>
    </View>
  );
};

export default Camera;
