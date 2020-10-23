/**
 * The first visual component in the app.  It is the ancestor of all other screens and components.
 */
import React, {Component} from 'react';
import NavigationStack from './Navigation/AppNavigation';

import {PhotosContextProvider} from './Utils/PhotosManager';
import {CameraContextProvider} from './Utils/CameraManager';

class RootContainer extends Component {
  render() {
    return (
      <PhotosContextProvider>
        <CameraContextProvider>
          <NavigationStack />
        </CameraContextProvider>
      </PhotosContextProvider>
    );
  }
}

export default RootContainer;
