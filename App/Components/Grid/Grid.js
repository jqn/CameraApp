import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';

import {Images} from '../../Themes';

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    height: '100%',
  },
});

const Grid = ({source = 'large'}) => {
  const [gridSource, setGridSource] = useState(Images.largeGrid);

  useEffect(() => {
    console.log('Grid -> source', source);
    if (source === 'large') {
      setGridSource(Images.largeGrid);
    } else if (source === 'grid') {
      setGridSource(Images.grid);
    } else {
      setGridSource(null);
    }
  }, [source]);

  if (source !== null) {
    return <Image source={gridSource} style={styles.grid} resizeMode="cover" />;
  } else {
    return null;
  }
};

export default Grid;
