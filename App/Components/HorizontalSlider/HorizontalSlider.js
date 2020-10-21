import React, {useState, useRef} from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Dimensions,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import Indicator from './Indicator';
import {useRatio} from '../../hooks';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#454545',
  },
  photo: {
    width: Math.round(Dimensions.get('window').width),
    height: 200,
  },
});

const Item = ({src, style}) => {
  const ratio = useRatio();

  return (
    <View style={[styles.item, style]}>
      <Image
        resizeMode="cover"
        style={[styles.photo, ratio]}
        source={{uri: src}}
      />
    </View>
  );
};

const HorizontalSlider = ({
  data,
  indexCallback,
  indicator = true,
  initialIndex,
  length,
  index = 0,
  indicatorStyle = {position: 'absolute', bottom: 20},
  indicatorContainerStyle,
  indicatorActiveColor,
  indicatorInActiveColor,
  indicatorActiveWidth,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const itemWidth = Math.round(Dimensions.get('window').width);
  const separatorWidth = 0;
  const totalItemWidth = itemWidth + separatorWidth;

  const slider = useRef(null);

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });

  const onViewRef = React.useRef(({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index;
      setSelectedIndex(currentIndex);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      if (indexCallback) {
        indexCallback(currentIndex);
      }
    }
  });

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#727272' : '#3a3a3a';

    const setIndex = (selectedItem) => {
      setSelectedId(selectedItem.id);
      indexCallback(selectedItem.id);
    };

    return (
      <Item
        src={item.uri}
        onPress={() => setIndex(item)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        ref={slider}
        data={data}
        horizontal
        pagingEnabled={true}
        snapToInterval={totalItemWidth}
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        windowSize={1}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        initialScrollIndex={initialIndex}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        getItemLayout={(data, index) => ({
          length: totalItemWidth,
          offset: totalItemWidth * index,
          index,
        })}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {indicator && (
        <Indicator
          itemCount={data.length}
          currentIndex={selectedIndex}
          indicatorActiveColor="#ff5f00"
          indicatorInActiveColor={'#ffffff'}
          indicatorActiveWidth={30}
        />
      )}
    </SafeAreaView>
  );
};

export default HorizontalSlider;
