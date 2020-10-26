import React, {useContext, useRef, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import ImageEditor from '@react-native-community/image-editor';
import CameraRoll from '@react-native-community/cameraroll';

import SettingsPanel from './SettingsPanel';
import CameraMask from './CameraMask';
import ControlPanel from './ControlPanel';
import GridOverlay from '../GridOverlay/GridOverlay';

import {useDeviceOrientation, useScreenDimensions} from '../../hooks';
import withCameraZoom from '../../HOCs/withCameraZoom';

import {PhotosContext} from '../../Utils/PhotosManager';
import {CameraContext} from '../../Utils/CameraManager';

const ViewWithZoom = withCameraZoom(View);

const DEFAULT_IMAGE_HEIGHT = 768;
const DEFAULT_IMAGE_WIDTH = 1024;
const ZOOM_F = 0.1;

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
  const screenData = useScreenDimensions();
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  const [type, setType] = useState('back');
  const [flash, setFlash] = useState('off');
  const [whiteBalance, setWhiteBalance] = useState('auto');
  const [grid, setGrid] = useState('large');
  const [sliders, setSliders] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [cameraZoom, setCameraZoom] = useState(0);

  const {photos, focusPoint, addPhoto, removePhotos} = useContext(
    PhotosContext,
  );

  const {exposure, switchFocusPoint} = useContext(CameraContext);

  const ref = React.useRef();
  let prevPinch = 1;

  useEffect(() => {
    if (photos.length !== 0) {
      let thumbnailPhoto = photos.slice(-1);
      setThumbnail(thumbnailPhoto[0].uri);
    } else {
      setThumbnail(null);
    }
  }, [photos]);

  const measure = () => {
    if (ref.current) {
      ref.current.measure((fx, fy, width, height, px, py) => {
        const location = {
          fx: fx,
          fy: fy,
          width: width,
          height: height,
          px: px,
          py: py,
        };
        console.log(location);
      });
    }
  };

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

  const onPinchStart = () => {
    prevPinch = 1;
  };

  const onPinchEnd = () => {
    prevPinch = 1;
  };

  const onPinchProgress = (p) => {
    console.log('onPinchProgress -> p', p);
    let p2 = p - prevPinch;
    if (p2 > 0 && p2 > ZOOM_F) {
      prevPinch = p;
      setCameraZoom(Math.min(cameraZoom + ZOOM_F, 1));
      console.log(
        'onPinchProgress round -> p',
        Math.min(cameraZoom + ZOOM_F, 1),
      );
    } else if (p2 < 0 && p2 < -ZOOM_F) {
      prevPinch = p;
      setCameraZoom(Math.max(cameraZoom - ZOOM_F, 0));
    }
  };

  const onSingleTap = (event) => {
    console.log(screenData);
    // measure();
    switchFocusPoint({
      x: event.nativeEvent.y / screenData.height,
      y: event.nativeEvent.x / screenData.width,
    });
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, width: 1024};
      const data = await cameraRef.current.takePictureAsync(options);
      let cropData = {
        offset: {x: 0, y: 0},
        size: {width: data.width, height: data.height},
        displaySize: {
          width: DEFAULT_IMAGE_WIDTH,
          height: DEFAULT_IMAGE_HEIGHT,
        },
        resizeMode: 'cover',
      };
      // measure();
      // TO DO - fine tune cropping
      let croppedImage = await ImageEditor.cropImage(data.uri, cropData);
      console.log('takePicture -> croppedImage', croppedImage);
      CameraRoll.save(croppedImage, {
        type: 'photo',
        album: 'CameraApp',
        groupTypes: 'Album',
      });
      addPhoto({id: `${Date.now()}`, uri: croppedImage});
    }
  };

  const openLibrary = async () => {
    let fetchParams = {
      first: 20,
      groupTypes: 'Album',
      groupName: 'CameraApp',
      assetType: 'Photos',
    };
    console.log('get photos');
    let photosAlbum = await CameraRoll.getPhotos(fetchParams);
    console.log('openLibrary -> albums', photosAlbum);
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
        maxZoom={8}
        exposure={exposure}
        autoFocusPointOfInterest={focusPoint}>
        <SettingsPanel
          onFlashPress={toggleFlash}
          onSlidersPress={toggleSliders}
          onWBalancePress={toggleWhiteBalance}
          onGridPress={toggleGrid}
          flashIcon={flashIcons[flash]}
          whiteBalanceIcon={whiteBalanceIcons[whiteBalance]}
          gridIcon={gridIcons[grid]}
          onLibraryPress={openLibrary}
        />
        <CameraMask>
          <ViewWithZoom
            style={styles.container}
            onPinchEnd={onPinchEnd}
            onPinchStart={onPinchStart}
            onPinchProgress={onPinchProgress}
            onSingleTap={onSingleTap}>
            <GridOverlay source={grid} ref={ref} />
          </ViewWithZoom>
        </CameraMask>
        <ControlPanel
          onCapturePress={takePicture}
          onCameraSwitchPress={toggleCameraType}
          // onCameraSwitchPress={() => removePhotos()}
          onThumbPress={() => navigation.navigate('Gallery')}
          showSlider={sliders}
          thumbnail={thumbnail}
        />
      </RNCamera>
      {/* <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 293,
          left: 0,
        }}
      /> */}
    </View>
  );
};

export default Camera;
