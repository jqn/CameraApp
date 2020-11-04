import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

const BasicLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.loaderText}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
});

export default BasicLoader;
