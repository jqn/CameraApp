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

const whiteBalanceIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'wb-shade',
  incandescent: 'wb-incandescent',
  fluorescent: 'wb-iridescent',
};

const Camera = ({children}) => {
  let cameraRef = useRef(null);

  let [type, setType] = useState('back');
  let [flash, setFlash] = useState('off');
  let [whiteBalance, setWhiteBalance] = useState('auto');
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

  const toggleWhiteBalance = () => {
    if (whiteBalance === 'auto') {
      setWhiteBalance('sunny');
    } else if (whiteBalance === 'sunny') {
      setWhiteBalance('cloudy');
    } else if (whiteBalance === 'cloudy') {
      setWhiteBalance('shadow');
    } else if (whiteBalance === 'shadow') {
      setWhiteBalance('incandescent');
    } else if (whiteBalance === 'incandescent') {
      setWhiteBalance('fluorescent');
    } else if (whiteBalance === 'fluorescent') {
      setWhiteBalance('auto');
    }
  };

  const toggleSliders = () => {
    if (sliders) {
      setSliders(false);
    } else {
      setSliders(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
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
          onWBalancePress={toggleWhiteBalance}
          flashIcon={flashIcons[flash]}
          whiteBalanceIcon={whiteBalanceIcons[whiteBalance]}
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
