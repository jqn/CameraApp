// https://github.com/react-native-camera/react-native-camera/issues/1282

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  TapGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

import Ripple from 'react-native-material-ripple';
/**
 * This HOC generalizes the camera screen context container
 * and allows for better Maintainability
 * @param {node} WrappedComponent
 */
const withCameraZoom = (WrappedComponent, ...props) => {
  return class CameraContainer extends Component {
    doubleTapRef = React.createRef();

    _onGesturePinch = ({nativeEvent}) => {
      this.props.onPinchProgress(nativeEvent.scale);
    };

    _onPinchHandlerStateChange = (event) => {
      const pinch_end = event.nativeEvent.state === State.END;
      const pinch_begin = event.nativeEvent.oldState === State.BEGAN;
      const pinch_active = event.nativeEvent.state === State.ACTIVE;
      if (pinch_end) {
        this.props.onPinchEnd();
      } else if (pinch_begin && pinch_active) {
        this.props.onPinchStart();
      }
    };

    _onSingleTap = (event) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        this.props.onSingleTap(event);
      }
    };

    render() {
      return (
        <PinchGestureHandler
          onGestureEvent={this._onGesturePinch}
          onHandlerStateChange={this._onPinchHandlerStateChange}>
          <TapGestureHandler
            onHandlerStateChange={this._onSingleTap}
            waitFor={this.doubleTapRef}>
            <TapGestureHandler ref={this.doubleTapRef} numberOfTaps={2}>
              <Ripple
                style={styles.wrapper}
                rippleSize={100}
                rippleColor="#FFF"
                rippleOpacity={0.8}>
                <WrappedComponent {...props} style={styles.wrapper}>
                  {this.props.children}
                </WrappedComponent>
              </Ripple>
            </TapGestureHandler>
          </TapGestureHandler>
        </PinchGestureHandler>
      );
    }
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default withCameraZoom;

withCameraZoom.displayName = 'WithCameraZoom';
