import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {backgroundColor: '#FFF'},
  sheet: {
    position: 'absolute',
    width: '100%',
    bottom: -300,
  },
  text: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
});

const ActionSheet = forwardRef(({children}, ref) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const slide = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  useImperativeHandle(ref, () => ({
    slideUp: () => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    },
    slideDown: () => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    },
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sheet, {transform: [{translateY: slide}]}]}>
        {children}
      </Animated.View>
    </View>
  );
});

export default ActionSheet;
