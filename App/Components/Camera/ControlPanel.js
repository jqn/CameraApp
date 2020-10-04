import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import StepSlider from './StepSlider';
import Controls from './Controls';
import ActionSheet from '../ActionSheet/ActionSheet';

import {useDeviceOrientation} from '../../hooks';

const styles = StyleSheet.create({
  columnsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  rowsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

const ControlPanel = ({
  showSlider,
  onThumbPress,
  onCapturePress,
  onCameraSwitchPress,
  thumbnail,
}) => {
  const childRef = useRef();

  const deviceOrientation = useDeviceOrientation();
  console.log('deviceOrientation', deviceOrientation);

  useEffect(() => {
    if (showSlider) {
      childRef.current.slideUp();
    } else {
      childRef.current.slideDown();
    }
  }, [showSlider]);

  return (
    <View
      style={
        deviceOrientation === 'PORTRAIT'
          ? styles.columnsContainer
          : styles.rowsContainer
      }>
      <ActionSheet visible={showSlider} ref={childRef}>
        <StepSlider min={-1} max={10} LRpadding={34} single={false} />
      </ActionSheet>
      <Controls
        onCapturePress={onCapturePress}
        onCameraSwitchPress={onCameraSwitchPress}
        thumbnail={thumbnail}
        onThumbPress={onThumbPress}
        orientation={deviceOrientation}
      />
    </View>
  );
};

export default ControlPanel;
