/**
 * The first visual component in the app.  It is the ancestor of all other screens and components.
 */
import React, {Component} from 'react';

import NavigationStack from './Navigation/AppNavigation';

class RootContainer extends Component {
  render() {
    return <NavigationStack />;
  }
}

export default RootContainer;
