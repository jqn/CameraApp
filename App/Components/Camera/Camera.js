import React from 'react';
import {StyleSheet} from 'react-native';

import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  preview: {
    flex: 1,
  },
});

const Camera = ({children}) => {
  return (
    <RNCamera style={styles.preview} captureAudio={false}>
      {children}
    </RNCamera>
  );
};

export default Camera;
