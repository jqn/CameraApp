import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

  const multiSliderValuesChange = (values) => {
    if (values >= 0) {
      setValue(values[0] / 10);
    } else {
      setValue(values[0]);
    }
    // if (single) {
    //   setSecond(1);
    // } else {
    //   setFirst(0);
    //   setSecond(2);
    // }
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
        {/* <MultiSlider
          trackStyle={{backgroundColor: '#bdc3c7'}}
          selectedStyle={{backgroundColor: '#5e5e5e'}}
          values={[0]}
          sliderLength={Dimensions.get('window').width - LRpadding * 2}
          onValuesChange={multiSliderValuesChange}
          min={min}
          max={max}
          step={1}
          allowOverlap={false}
          customMarker={Marker}
          snapped={true}
        /> */}
        <MultiSlider
          values={[-1]}
          enableLabel
          customMarker={Marker}
          min={-1}
          max={10}
          step={1}
          snapped
          onValuesChange={multiSliderValuesChange}
          // sliderLength={dimensions.window.width - 72}
          // sliderLength={382}
          sliderLength={Dimensions.get('window').width - LRpadding * 2}
          containerStyle={{
            height: 30,
          }}
          selectedStyle={{
            backgroundColor: '#ff5f00',
          }}
        />
        <Text style={styles.label}>Exposure</Text>
        {/* <Slider
          style={{
            width: Dimensions.get('window').width - LRpadding * 2,
            height: 40,
          }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={1}
          thumbImage={require('../../Images/exposure-icon.png')}
        /> */}
      </View>
    </View>
  );
};

export default StepSlider;
