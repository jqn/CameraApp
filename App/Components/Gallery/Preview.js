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

const numColumns = 3;
const numMargins = 2;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    src: require('../../Images/mountains.jpg'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    src: require('../../Images/flower-plant.jpg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    src: require('../../Images/leaf.jpg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Fourth Item',
    src: require('../../Images/medusa.jpg'),
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

const Item = ({src, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image resizeMode="cover" style={styles.photo} source={src} />
  </TouchableOpacity>
);

const Preview = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const renderItem = ({item}) => {
    return <Item src={item.src} onPress={() => setModalVisible(false)} />;
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            data={DATA}
            horizontal
            pagingEnabled={true}
            snapToInterval={Math.round(Dimensions.get('window').width)}
            showsHorizontalScrollIndicator
            decelerationRate="fast"
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            bounces={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Preview;
