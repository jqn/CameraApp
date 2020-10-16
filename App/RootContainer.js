/**
 * The first visual component in the app.  It is the ancestor of all other screens and components.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import NavigationStack from './Navigation/AppNavigation';

class RootContainer extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationStack />
      </View>
    );
  }
}

export default RootContainer;
