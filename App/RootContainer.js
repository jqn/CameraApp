/**
 * The first visual component in the app.  It is the ancestor of all other screens and components.
 */
import React, {Component} from 'react';
import NavigationStack from './Navigation/AppNavigation';

import {PhotosContext, PhotosContextProvider} from './Utils/PhotosManager';

class RootContainer extends Component {
  render() {
    return (
      <PhotosContextProvider>
        <NavigationStack />
      </PhotosContextProvider>
    );
  }
}

export default RootContainer;
