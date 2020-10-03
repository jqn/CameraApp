import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import StepSlider from './StepSlider';
import Controls from './Controls';
import ActionSheet from '../ActionSheet/ActionSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const ControlPanel = ({showSlider}) => {
  const childRef = useRef();
  useEffect(() => {
    if (showSlider) {
      childRef.current.slideUp();
    } else {
      childRef.current.slideDown();
    }
  }, [showSlider]);

  return (
    <View style={styles.container}>
      <ActionSheet visible={showSlider} ref={childRef}>
        <StepSlider min={-1} max={10} LRpadding={34} single={false} />
      </ActionSheet>
      <Controls onCapturePress={() => {}} />
    </View>
  );
};

export default ControlPanel;
