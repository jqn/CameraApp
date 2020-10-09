import React, {useState} from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';

import GridList from './GridList';
import HorizontalSlider from '../HorizontalSlider/HorizontalSlider';
// import {FlatListSlider} from 'react-native-flatlist-slider';

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

const OVERLAY_DATA = [
  {
    id: '1',
    title: 'First Item',
    src: require('../../Images/mountains.jpg'),
  },
  {
    id: '2',
    title: 'Second Item',
    src: require('../../Images/flower-plant.jpg'),
  },
  {
    id: '3',
    title: 'Third Item',
    src: require('../../Images/leaf.jpg'),
  },
  {
    id: '4',
    title: 'Fourth Item',
    src: require('../../Images/medusa.jpg'),
  },
];

const gridList = OVERLAY_DATA;
const overlayList = OVERLAY_DATA;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  modalView: {
    margin: 18,
  },
});

const Gallery = ({images}) => {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  // const screenWidth = Math.round(Dimensions.get('window').width);
  console.log('DATA', OVERLAY_DATA);
  return (
    <View style={{flex: 1}}>
      <GridList
        data={gridList}
        // onItemPress={(item) => console.log('item', item)}
        onItemPress={() => {
          setVisible(true);
          // setItems(OVERLAY_DATA);
          // console.log('Gallery -> images', OVERLAY_DATA);
        }}
      />
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HorizontalSlider data={overlayList} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Gallery;
