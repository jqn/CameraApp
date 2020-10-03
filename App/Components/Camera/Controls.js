import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: getStatusBarHeight(),
    paddingHorizontal: 16,
    backgroundColor: '#3a3a3a',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
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

const Controls = ({onCapturePress, thumbnail = false}) => {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.section}>
          {thumbnail ? (
            <View style={[styles.square, styles.leftIcon]} />
          ) : (
            <Fontisto
              name="photograph"
              color="#FFF"
              size={50}
              style={styles.leftIcon}
              // onPress={onCapturePress}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.section}
          onPress={onCapturePress}
          activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            color="#FFF"
            size={68}
            style={styles.centerIcon}
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <MaterialIcons
            name="flip-camera-android"
            color="#FFF"
            size={50}
            style={styles.rightIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Controls;
