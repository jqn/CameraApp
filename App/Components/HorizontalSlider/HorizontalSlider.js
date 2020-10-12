import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import Indicator from './Indicator';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#454545',
  },
  photo: {
    width: Math.round(Dimensions.get('window').width),
    height: 200,
  },
});

const Item = ({image, style}) => (
  <View style={[styles.item, style]}>
    <Image resizeMode="center" style={styles.photo} source={image} />
  </View>
);

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const itemWidth = Math.round(Dimensions.get('window').width);
  const separatorWidth = 0;
  const totalItemWidth = itemWidth + separatorWidth;

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });

  const onViewRef = React.useRef(({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      setSelectedIndex(viewableItems[0].index);
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
        image={item.src}
        onPress={() => setIndex(item)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
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
          itemCount={4}
          currentIndex={selectedIndex % data.length}
          indicatorActiveColor="#ff5f00"
          indicatorInActiveColor={'#ffffff'}
          indicatorActiveWidth={30}
        />
      )}
    </SafeAreaView>
  );
};

export default HorizontalSlider;
