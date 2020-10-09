import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const HorizontalSlider = ({data, indexCallback}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    // console.log('renderItem -> item', item);
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    const setIndex = (selectedItem) => {
      console.log('setIndex -> selectedItem', selectedItem.id);
      setSelectedId(selectedItem.id);
      indexCallback(selectedItem.id);
    };

    return (
      <Item
        item={item}
        onPress={() => setIndex(item)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        horizontal
        initialNumToRender={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HorizontalSlider;
