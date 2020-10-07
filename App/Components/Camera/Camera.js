import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

import SettingsPanel from './SettingsPanel';
import CameraMask from './CameraMask';
import ControlPanel from './ControlPanel';
import Grid from '../Grid/Grid';

import {useDeviceOrientation} from '../../hooks';

const styles = StyleSheet.create({
  rows: {
    flex: 1,
    flexDirection: 'row',
  },
  columns: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
});

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

const gridIcons = {
  grid: 'grid',
  large: 'grid-large',
  off: 'grid-off',
};

const Camera = ({children}) => {
  const deviceOrientation = useDeviceOrientation();
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  const [type, setType] = useState('back');
  const [flash, setFlash] = useState('off');
  const [whiteBalance, setWhiteBalance] = useState('auto');
  const [grid, setGrid] = useState('large');
  const [sliders, setSliders] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [cameraZoom, setCameraZoom] = useState(0);

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

  const toggleGrid = () => {
    if (grid === 'large') {
      setGrid('grid');
    } else if (grid === 'grid') {
      setGrid('off');
    } else if (grid === 'off') {
      setGrid('large');
    }
  };

  const toggleSliders = () => {
    if (sliders) {
      setSliders(false);
    } else {
      setSliders(true);
    }
  };

  const zoomIn = () => {
    setCameraZoom(cameraZoom + 0.01 > 1 ? 1 : cameraZoom + 0.04);
  };

  const zoomOut = () => {
    setCameraZoom(cameraZoom - 0.1 < 0 ? 0 : cameraZoom - 0.1);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5};
      const data = await cameraRef.current.takePictureAsync(options);
      setThumbnail(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={deviceOrientation === 'PORTRAIT' ? styles.columns : styles.rows}
        captureAudio={false}
        type={type}
        flashMode={flash}
        whiteBalance={whiteBalance}
        zoom={cameraZoom}
        maxZoom={8}>
        <SettingsPanel
          onFlashPress={toggleFlash}
          onSlidersPress={toggleSliders}
          onWBalancePress={toggleWhiteBalance}
          onGridPress={toggleGrid}
          flashIcon={flashIcons[flash]}
          whiteBalanceIcon={whiteBalanceIcons[whiteBalance]}
          gridIcon={gridIcons[grid]}
        />
        <CameraMask>
          <Grid source={grid} />
        </CameraMask>
        <ControlPanel
          onCapturePress={takePicture}
          onCameraSwitchPress={toggleCameraType}
          onThumbPress={() => navigation.navigate('Gallery')}
          showSlider={sliders}
          thumbnail={thumbnail}
        />
      </RNCamera>
    </View>
  );
};

export default Camera;
