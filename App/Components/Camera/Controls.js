import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  columnsContainer: {
    paddingTop: 8,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 16,
    backgroundColor: '#3a3a3a',
    zIndex: 200,
  },
  rowsContainer: {
    paddingLeft: 8,
    paddingRight: getStatusBarHeight(true),
    paddingVertical: 16,
    backgroundColor: '#3a3a3a',
    zIndex: 200,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columns: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    height: '100%',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    alignSelf: 'flex-start',
  },
  rightIcon: {
    alignSelf: 'flex-end',
  },
  centerIcon: {
    alignSelf: 'center',
  },
  square: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFF',
  },
});

const Controls = ({
  onThumbPress,
  onCapturePress,
  onCameraSwitchPress,
  thumbnail = null,
  orientation = 'PORTRAIT',
}) => {
  return (
    <View
      style={
        orientation === 'PORTRAIT'
          ? styles.columnsContainer
          : styles.rowsContainer
      }>
      <View style={orientation === 'PORTRAIT' ? styles.rows : styles.columns}>
        <TouchableOpacity
          style={orientation === 'PORTRAIT' ? styles.section : styles.stack}
          onPress={onThumbPress}
          activeOpacity={0.5}>
          {thumbnail === null ? (
            <Fontisto
              name="photograph"
              color="#FFF"
              size={50}
              style={
                orientation === 'PORTRAIT' ? styles.leftIcon : styles.centerIcon
              }
            />
          ) : (
            <Image
              style={[
                styles.square,
                orientation === 'PORTRAIT'
                  ? styles.leftIcon
                  : styles.centerIcon,
              ]}
              source={{uri: thumbnail}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={orientation === 'PORTRAIT' ? styles.section : styles.stack}
          onPress={onCapturePress}
          activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            color="#FFF"
            size={68}
            style={styles.centerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={orientation === 'PORTRAIT' ? styles.section : styles.stack}
          onPress={onCameraSwitchPress}
          activeOpacity={0.5}>
          <MaterialIcons
            name="flip-camera-android"
            color="#FFF"
            size={50}
            style={
              orientation === 'PORTRAIT' ? styles.rightIcon : styles.centerIcon
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Controls;
