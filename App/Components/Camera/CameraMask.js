import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';

const CameraMask = ({outerMaskOpacity, backgroundColor, children}) => {
  const [deviceOrientation, setDeviceOrientation] = useState(null);
  const [ratio, setRatio] = useState({height: 0, width: 0});

  useEffect(() => {
    const updateState = () => {
      const {height, width} = Dimensions.get('window');
      if (height >= width) {
        let ratioHeight = (3 * width) / 4;
        setDeviceOrientation('portrait');
        setRatio({height: ratioHeight, width: width});
      } else {
        setDeviceOrientation('landscape');
        let ratioWidth = (4 * height) / 3;
        setRatio({height: height, width: ratioWidth});
      }
    };

    updateState(); // for initial render
    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);

  return (
    <View style={[styles.container]} pointerEvents="box-none">
      <View
        style={[styles.finder, {width: ratio.width, height: ratio.height}]}
      />
      <View style={styles.maskOuter}>
        <View
          style={[
            deviceOrientation === 'landscape'
              ? styles.maskColumn
              : styles.maskRow,
            {
              backgroundColor,
              opacity: outerMaskOpacity,
            },
          ]}
        />
        <View style={[{height: ratio.height}, styles.maskCenter]}>
          <View
            style={[
              {
                backgroundColor,
                opacity: outerMaskOpacity,
              },
              deviceOrientation === 'landscape'
                ? styles.leftSection
                : styles.collapsedView,
              {},
            ]}
          />
          <View
            style={[
              styles.maskInner,
              {width: ratio.width, height: ratio.height},
            ]}>
            {children}
          </View>
          <View
            style={[
              {
                backgroundColor,
                opacity: outerMaskOpacity,
              },
              deviceOrientation === 'landscape'
                ? styles.rightSection
                : styles.collapsedView,
            ]}
          />
        </View>
        <View
          style={[
            deviceOrientation === 'landscape'
              ? styles.maskColumn
              : styles.maskRow,
            {
              backgroundColor,
              opacity: outerMaskOpacity,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
    flex: 1,
  },
  maskColumn: {
    height: '100%',
    flex: 0,
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftSection: {
    justifyContent: 'center',
    flex: 0.8,
  },
  rightSection: {
    justifyContent: 'center',
    flex: 1.2,
  },
  collapsedView: {
    flex: 0,
  },
});

CameraMask.defaultProps = {
  outerMaskOpacity: 0.69,
  finderWidth: 280,
  finderHeight: 230,
  backgroundColor: '#000',
};

export default CameraMask;
