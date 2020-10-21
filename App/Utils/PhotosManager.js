import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const PhotosContext = createContext();

export const PhotosContextProvider = ({children}) => {
  const [photos, setPhotos] = useState([]);

  const addPhoto = (photo) => {
    setPhotos([...photos, photo]);
  };
  const removePhoto = (photo) => setPhotos(photos, ...photo);
  const removePhotos = async () => {
    await AsyncStorage.removeItem('PHOTO_APP::PHOTO_LIST');
    setPhotos([]);
  };

  useEffect(() => {
    if (photos.length !== 0) {
      AsyncStorage.setItem('PHOTO_APP::PHOTO_LIST', JSON.stringify(photos));
    }
  }, [photos]);

  useEffect(() => {
    AsyncStorage.getItem('PHOTO_APP::PHOTO_LIST').then((value) => {
      if (value) {
        setPhotos(JSON.parse(value));
      }
    });
  }, []);

  return (
    <PhotosContext.Provider
      Provider
      value={{photos, addPhoto, removePhoto, removePhotos}}>
      {children}
    </PhotosContext.Provider>
  );
};
