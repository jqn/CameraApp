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

export const useRatio = () => {
  // Common ratios
  // Square - 1:1 Ratio
  // Rectangle - 4:3 Ratio
  // Wide - 16:9 Ratio
  // https://www.shutterstock.com/blog/common-aspect-ratios-photo-image-sizes

  const [ratio, setRatio] = useState(null);

  useEffect(() => {
    const updateState = () => {
      const {height, width} = Dimensions.get('window');
      if (height > width) {
        // Portrait
        let ratioHeight = (3 * width) / 4;
        setRatio({height: ratioHeight, width: width});
      } else {
        // Landscape
        let ratioWidth = (4 * height) / 3;
        setRatio({height: height, width: ratioWidth});
      }
    };

    updateState(); // for initial render
    Dimensions.addEventListener('change', updateState);
    return () => Dimensions.removeEventListener('change', updateState);
  }, []);

  return ratio;
};
