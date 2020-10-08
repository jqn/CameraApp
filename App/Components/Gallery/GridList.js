import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  photo: {
    width: Dimensions.get('window').width / numColumns - numMargins,
    height: Dimensions.get('window').width / numColumns,
  },
});

const formatData = (data) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};

const Item = ({src, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image resizeMode="cover" style={styles.photo} source={src} />
  </TouchableOpacity>
);

const EmptyItem = () => <View style={[styles.item, styles.itemInvisible]} />;

const GridList = ({columns = 3}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    if (item.empty === true) {
      return <EmptyItem />;
    }
    return (
      <Item
        src={item.src}
        style={backgroundColor}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={formatData(DATA, columns)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default GridList;
