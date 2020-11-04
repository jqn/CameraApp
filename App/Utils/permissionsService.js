import {
  check,
  request,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';

export const checkMultiplePermissions = async (permissions) => {
  const statuses = await checkMultiple(permissions);
  return statuses;
};

export const checkPermission = async (permission) => {
  let isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
};

export const requestPermission = async (permission) => {
  let isPermissionGranted = false;
  const result = await request(permission, {type: 'Always'});
  switch (result) {
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
    case RESULTS.BLOCKED:
      isPermissionGranted = false;
      break;
    case RESULTS.UNAVAILABLE:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
};
