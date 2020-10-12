import React, {useState} from 'react';
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

const HorizontalSlider = ({data, indexCallback, indicator, initialIndex}) => {
  const itemWidth = Math.round(Dimensions.get('window').width);
  const separatorWidth = 0;
  const totalItemWidth = itemWidth + separatorWidth;

  const [selectedId, setSelectedId] = useState(null);

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
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        getItemLayout={(data, index) => ({
          length: totalItemWidth,
          offset: totalItemWidth * index,
          index,
        })}
        windowSize={1}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        initialScrollIndex={initialIndex}
      />
      <Indicator />
    </SafeAreaView>
  );
};

export default HorizontalSlider;
