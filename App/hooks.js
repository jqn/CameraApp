import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useDeviceOrientation = () => {
  const [deviceOrientation, setDeviceOrientation] = useState(null);

  useEffect(() => {
    const updateState = () => {
      const {height, width} = Dimensions.get('window');
      if (height >= width) {
        setDeviceOrientation('PORTRAIT');
      } else {
        setDeviceOrientation('LANDSCAPE');
      }
    };

    updateState(); // for initial render
    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);

  return deviceOrientation;
};

export const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

// export default () => {
//   const screenData = useScreenDimensions();

//   return (
//     <View
//       style={[
//         styles.container,
//         screenData.isLandscape && styles.containerLandscape,
//       ]}>
//       <View style={[styles.box, {width: screenData.width / 2}]} />
//     </View>
//   );
// };
