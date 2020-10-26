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

import {PhotosContext} from '../../Utils/PhotosManager';

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

  const {photos} = useContext(PhotosContext);

  useEffect(() => {
    const fetchPhotos = async () => {
      let fetchParams = {
        first: 20,
        groupTypes: 'Album',
        groupName: 'CameraApp',
        assetType: 'Photos',
      };
      let photosAlbum = await CameraRoll.getPhotos(fetchParams);
      console.log('fetchPhotos -> photosAlbum', photosAlbum);
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
        data={photos}
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
              data={photos}
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
