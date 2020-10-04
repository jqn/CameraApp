import React from 'react';
import {StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';

import {useDeviceOrientation} from '../../hooks';

const styles = StyleSheet.create({
  rowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#3a3a3a',
    zIndex: 120,
    paddingTop: 32,
    paddingBottom: 4,
  },
  columnsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingLeft: getStatusBarHeight(),
    paddingRight: 16,
    backgroundColor: '#3a3a3a',
    zIndex: 120,
  },
});

const SettingsPanel = ({
  onFlashPress,
  onWBalancePress,
  onGridPress,
  onGalleryPress,
  onSlidersPress,
  flashIcon = 'flash-off',
  whiteBalanceIcon = 'wb-auto',
  gridIcon = 'grid-large',
}) => {
  const deviceOrientation = useDeviceOrientation();

  return (
    <View
      style={
        deviceOrientation === 'PORTRAIT'
          ? styles.rowsContainer
          : styles.columnsContainer
      }>
      <MaterialCommunityIcons
        name={flashIcon}
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onFlashPress}
      />
      <MaterialIcons
        name={whiteBalanceIcon}
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onWBalancePress}
      />
      <MaterialCommunityIcons
        name={gridIcon}
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onGridPress}
      />
      <MaterialIcons
        name="photo-library"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onGalleryPress}
      />
      <FontAwesome
        name="sliders"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onSlidersPress}
      />
    </View>
  );
};

export default SettingsPanel;
