/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';

import RootContainer from './RootContainer';

class App extends Component {
  render() {
    return <RootContainer />;
  }
}

export default App;
