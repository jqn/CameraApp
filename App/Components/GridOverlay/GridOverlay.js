import React, {forwardRef, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';

import {Images} from '../../Themes';

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    height: '100%',
  },
});

const Grid = forwardRef(({children, source = 'large'}, ref) => {
  const [gridSource, setGridSource] = useState(Images.largeGrid);

  useEffect(() => {
    if (source === 'large') {
      setGridSource(Images.largeGrid);
    } else if (source === 'grid') {
      setGridSource(Images.grid);
    } else {
      setGridSource(null);
    }
  }, [source]);

  if (source !== null) {
    return (
      <Image
        ref={ref}
        source={gridSource}
        style={styles.grid}
        resizeMode="cover"
      />
    );
  } else {
    return null;
  }
});

export default Grid;
