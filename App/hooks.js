export const defaultPictureTakeOptions = {
  quality: 0.8,
  width: undefined,
  base64: false,
  doNotSave: false,
  exif: true,
  forceUpOrientation: true,
  fixOrientation: true,
  orientation: 'portrait',
};

export const takePicture = async (
  {cameraRef},
  options = defaultPictureTakeOptions,
) => {
  if (cameraRef && cameraRef.takePictureAsync) {
    return cameraRef.takePictureAsync(options);
  } else if (
    cameraRef &&
    cameraRef.current &&
    cameraRef.current.takePictureAsync
  ) {
    return cameraRef.current.takePictureAsync(options);
  }
};
