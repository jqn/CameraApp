import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  DeviceEventEmitter,
} from 'react-native';

import Orientation from 'react-native-orientation-locker';
// import RnSmsRetriever, {SMS_EVENT} from 'rn-sms-retriever';
import SmsReader from 'react-native-sms-reader';

import {Camera} from '../../Components/Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class CameraScreen extends Component {
  state = {orientation: 'PORTRAIT', showSlider: false};

  componentDidMount = () => {
    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(
      this._addDeviceOrientationListener,
    );
    this.startReadSMS();
    // set Up SMS Listener
    // DeviceEventEmitter.addListener(SMS_EVENT, (msg) => {
    //   console.log(msg);
    // });
    // this._smsInitialize();
  };

  componentWillUnmount = () => {
    Orientation.removeDeviceOrientationListener(
      this._addDeviceOrientationListener,
    );
    // DeviceEventEmitter.removeAllListeners(SMS_EVENT);
  };

  _addDeviceOrientationListener = (deviceOrientation) => {
    this.setState({orientation: deviceOrientation});
  };

  // _smsInitialize = async () => {
  //   // get list of available phone numbers
  //   const selectedPhone = await RnSmsRetriever.requestPhoneNumber();
  //   console.log(
  //     '🚀 ~ file: CameraScreen.js ~ line 50 ~ CameraScreen ~ _smsInitialize= ~ selectedPhone',
  //     selectedPhone,
  //   );
  //   // get App Hash
  //   const hash = await RnSmsRetriever.getAppHash();
  //   console.log('Your App Hash is : ' + hash);
  //   // start Retriever;
  //   await RnSmsRetriever.startSmsRetriever();
  // };

  startReadSMS = async () => {
    const hasPermission = await SmsReader.requestReadSMSPermission();
    console.log(
      '🚀 ~ file: CameraScreen.js ~ line 65 ~ CameraScreen ~ startReadSMS= ~ hasPermission',
      hasPermission,
    );
    if (hasPermission) {
      SmsReader.startReadSMS((status, sms, error) => {
        console.log(
          '🚀 ~ file: CameraScreen.js ~ line 67 ~ CameraScreen ~ SmsReader.startReadSMS ~ status',
          status,
        );
        if (status == 'success') {
          console.log('Great!! you have received new sms:', sms);
        }
      });
    }
  };

  componentWillUnmount = () => {
    SmsReader.stopReadSMS();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Camera />
      </View>
    );
  }
}

export default CameraScreen;
