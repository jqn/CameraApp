import React, {useContext, useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {CameraContext} from '../../Utils/CameraManager';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#727272',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: -10,
  },
  active: {
    textAlign: 'center',
    fontSize: 20,
    color: '#5e5e5e',
  },
  inactive: {
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#bdc3c7',
  },
  line: {
    paddingLeft: StyleSheet.hairlineWidth,
    color: '#FFF',
  },
  label: {
    color: '#FFF',
    paddingBottom: 4,
  },
  image: {
    width: 20,
    height: 20,
  },
});

const Marker = () => {
  return (
    <Image
      style={styles.image}
      source={require('../../Images/exposure-icon.png')}
      resizeMode="contain"
    />
  );
};

const Item = ({value, first, second}) => {
  const checkActive = () => {
    if (value >= first && value <= second) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Text style={[styles.line]}>{'|'}</Text>
    </>
  );
};

const StepSlider = ({LRpadding, min, max, single}) => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(10);
  const [value, setValue] = React.useState([0]);

  const {exposure, setCameraExposure, enableAutoExposure} = useContext(
    CameraContext,
  );

  const [dimensions, setDimensions] = useState({window});

  const onChange = ({windowDimensions}) => {
    setDimensions({window});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const SliderValueChange = (values) => {
    if (values >= 0) {
      setValue(values[0] / 10);
      setCameraExposure(values[0] * 0.1);
      // console.log('SliderValueChange -> values', Math.round(values[0] * 0.1));
      // var discount = Math.round((100 - (price / listprice) * 100) * 100) / 100;
    } else {
      setValue(values[0]);
      setCameraExposure(-1);
    }
  };

  const renderScale = () => {
    const items = [];
    for (let i = min; i <= max; i++) {
      items.push(<Item key={i} value={i} first={first} second={second} />);
    }
    return items;
  };

  return (
    <View style={styles.container} animation={'slideInUp'}>
      <View
        style={[
          styles.column,
          {marginLeft: LRpadding - 2, marginRight: LRpadding - 2},
        ]}>
        {renderScale()}
      </View>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[-1]}
          enableLabel
          customMarker={Marker}
          min={-1}
          max={10}
          step={1}
          snapped
          onValuesChange={SliderValueChange}
          sliderLength={Dimensions.get('window').width - LRpadding * 2}
          containerStyle={{
            height: 30,
          }}
          selectedStyle={{
            backgroundColor: '#ff5f00',
          }}
        />
        <Text style={styles.label}>Exposure</Text>
      </View>
    </View>
  );
};

export default StepSlider;
