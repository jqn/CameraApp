import React from 'react';
import {StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#3a3a3a',
    zIndex: 120,
    paddingTop: 32,
    paddingBottom: 4,
  },
});

const SettingsPanel = ({
  onFlashPress,
  onWBalancePress,
  onGridPress,
  onGalleryPress,
  onSlidersPress,
  flashIcon = 'flash-off',
}) => {
  return (
    <View style={styles.groupContainer}>
      <MaterialCommunityIcons
        name={flashIcon}
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onFlashPress}
      />
      <MaterialIcons
        name="wb-auto"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onWBalancePress}
      />
      <MaterialCommunityIcons
        name="grid"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onGridPress}
      />
      <FontAwesome
        name="picture-o"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onGalleryPress}
      />
      <FontAwesome
        name="sliders"
        color="#FFF"
        size={35}
        style={styles.centerIcon}
        onPress={onSlidersPress}
      />
    </View>
  );
};

export default SettingsPanel;
