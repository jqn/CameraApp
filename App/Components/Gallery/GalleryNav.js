import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const GalleryNav = ({onCameraPress, onLibraryPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.leftMenu}>
          <Text style={styles.menuLabel} />
        </View>
        <View style={styles.rightMenu}>
          <TouchableOpacity
            onPress={onCameraPress}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.menuLabel}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLibraryPress}
            activeOpacity={0.7}
            style={styles.button}>
            <Text style={styles.menuLabel}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Captures</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  menu: {
    paddingHorizontal: 16,
    marginTop: StatusBar.currentHeight || 16,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuLabel: {
    color: '#FF5F00',
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '400',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  titleText: {
    color: '#FF5F00',
    fontFamily: 'System',
    fontSize: 60,
    fontWeight: '600',
  },
  title: {
    paddingLeft: 8,
    paddingTop: 8,
  },
});

GalleryNav.defaultProps = {
  onCameraPress: () => {},
  onLibraryPress: () => {},
};

GalleryNav.propTypes = {
  onCameraPress: PropTypes.func,
  onLibraryPress: PropTypes.func,
};

export default GalleryNav;
