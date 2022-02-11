import React, {useContext, useState, useEffect} from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';

import GridList from './GridList';
import GalleryNav from './GalleryNav';
import HorizontalSlider from '../HorizontalSlider/HorizontalSlider';

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

const Gallery = () => {
  const [visible, setVisible] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPhotos = async () => {
      let fetchParams = {
        first: 100,
        groupTypes: 'Album',
        groupName: 'CameraApp',
        assetType: 'Photos',
      };
      let album = await CameraRoll.getPhotos(fetchParams);
      console.log('fetchPhotos -> photosAlbum', album);
      let photosList = album.edges.map((item) => {
        console.log('fetchPhotos -> item', item);
        return {id: `${Date.now()}`, uri: item.node.image.uri};
      });
      console.log('fetchPhotos -> photosList', photosList);
      setImageList(photosList);
    };

    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <GalleryNav
        onCameraPress={() => navigation.navigate('Camera')}
        onLibraryPress={() => {}}
      />
      <GridList
        data={imageList}
        indexCallback={(index) => {
          setInitialIndex(index);
          setVisible(true);
          StatusBar.setBarStyle('light-content');
        }}
      />
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              StatusBar.setBarStyle('dark-content');
            }}
            style={styles.pressable}
          />
          <View style={styles.modalView}>
            <HorizontalSlider
              data={imageList}
              indexCallback={(index) => console.log('Index', index)}
              initialIndex={initialIndex}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              StatusBar.setBarStyle('dark-content');
            }}
            style={styles.pressable}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Gallery;
