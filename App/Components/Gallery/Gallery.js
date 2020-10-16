import React, {useState} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import GridList from './GridList';
import GalleryNav from './GalleryNav';
import HorizontalSlider from '../HorizontalSlider/HorizontalSlider';

const DATA = [
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  modalView: {
    backgroundColor: '#454545',
  },
  pressable: {
    flex: 1,
  },
});

const Gallery = ({images}) => {
  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <GalleryNav
        onCameraPress={() => navigation.navigate('Camera')}
        onLibraryPress={() => {}}
      />
      <GridList
        data={DATA}
        indexCallback={(index) => {
          setInitialIndex(index);
          setVisible(true);
        }}
      />
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.pressable}
          />
          <View style={styles.modalView}>
            <HorizontalSlider
              data={DATA}
              indexCallback={(index) => console.log('Index', index)}
              initialIndex={initialIndex}
            />
          </View>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.pressable}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Gallery;
