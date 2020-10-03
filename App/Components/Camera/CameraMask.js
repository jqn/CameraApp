import React, {useState, useEffect} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

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
        console.log('updateState -> setDeviceOrientation', 'portrait');
      } else {
        setDeviceOrientation('landscape');
        let ratioWidth = (4 * height) / 3;
        setRatio({height: height, width: ratioWidth});
        console.log('updateState -> setDeviceOrientation', 'landscape');
      }
    };

    updateState(); // for initial render
    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);

  return (
    <View style={[styles.container]}>
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
                ? styles.sectionView
                : styles.collapsedView,
            ]}
          />
          <View
            style={[
              styles.maskInner,
              {width: ratio.width, height: ratio.height},
            ]}>
            {/* <Text>{`Window Dimensions: height - ${ratio.height}, width - ${ratio.width}`}</Text> */}
            {children}
          </View>
          <View
            style={[
              {
                backgroundColor,
                opacity: outerMaskOpacity,
              },
              deviceOrientation === 'landscape'
                ? styles.sectionView
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
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
  sectionView: {
    flex: 1,
  },
  collapsedView: {
    flex: 0,
  },
});

CameraMask.defaultProps = {
  outerMaskOpacity: 0.69,
  finderWidth: 280,
  finderHeight: 230,
  backgroundColor: 'rgb(0, 0, 0)',
};

export default CameraMask;
