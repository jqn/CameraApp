import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//     src: require('../../Images/mountains.jpg'),
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//     src: require('../../Images/flower-plant.jpg'),
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//     src: require('../../Images/leaf.jpg'),
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d74',
//     title: 'Fourth Item',
//     src: require('../../Images/medusa.jpg'),
//   },
// ];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  modalView: {
    margin: 18,
  },
  item: {
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  photo: {
    width: Math.round(Dimensions.get('window').width),
    height: 200,
  },
});

// const Item = ({src, onPress, style}) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Image resizeMode="cover" style={styles.photo} source={src} />
//   </TouchableOpacity>
// );

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const HorizontalSlider = ({data, onItemPress}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [index, setIndex] = useState(0);
  // const [listData, setListData] = useState(data);

  const renderItem = ({item}) => {
    console.log('renderItem -> item', item);
    console.log('renderItem -> item', item);
    return <Item item={item} onPress={onItemPress} />;
  };

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const itemWidth = Math.round(Dimensions.get('window').width);
  const separatorWidth = 0;
  const totalItemWidth = itemWidth + separatorWidth;

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={DATA}
        horizontal
        renderItem={renderItem}
        extraData={DATA}
        // removeClippedSubviews
        // keyExtractor={(item) => console.log('item', item)}
        // pagingEnabled={true}
        // snapToInterval={totalItemWidth}
        // decelerationRate="fast"
        // bounces={false}
        // showsHorizontalScrollIndicator
        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={viewabilityConfig}
        // getItemLayout={(data, index) => ({
        //   length: totalItemWidth,
        //   offset: totalItemWidth * index,
        //   index,
        // })}
        // windowSize={1}
        // initialNumToRender={1}
        // maxToRenderPerBatch={1}
        // removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default HorizontalSlider;
