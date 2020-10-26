import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

const numColumns = 3;
const numMargins = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 8,
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
  console.log('formatData -> data', data);
  const formattedData = [];
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    formattedData.push({id: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return [...data, ...formattedData];
};

const Item = ({src, onPress, style, index}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image resizeMode="cover" style={styles.photo} source={{uri: src}} />
    </TouchableOpacity>
  );
};

const EmptyItem = () => <View style={[styles.item, styles.itemInvisible]} />;

const GridList = ({columns = 3, data = [], indexCallback}) => {
  const [selectedId, setSelectedId] = useState(null);

  const setIndex = (selectedItem, index) => {
    setSelectedId(selectedItem.id);
    indexCallback(index);
  };

  const renderItem = ({item, index}) => {
    const backgroundColor = item.id === selectedId ? '#727272' : '#3a3a3a';

    if (item.empty === true) {
      return <EmptyItem />;
    }

    return (
      <Item
        src={item.uri}
        style={backgroundColor}
        onPress={() => setIndex(item, index)}
        index={index}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={formatData(data, columns)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default GridList;
