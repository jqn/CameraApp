import React, {useState, createContext} from 'react';

export const CameraContext = createContext(-1);

export const CameraContextProvider = ({children}) => {
  const [exposure, setExposure] = useState(-1);
  const [focusPoint, setFocusPoint] = useState({x: 0.5, y: 0.5});

  const setCameraExposure = (value) => {
    setExposure(value);
  };

  const enableAutoExposure = () => {
    setExposure(-1);
  };

  const switchFocusPoint = (points) => {
    console.log('switchFocusPoint -> point', points);
    setFocusPoint(points);
  };

  return (
    <CameraContext.Provider
      value={{
        exposure,
        focusPoint,
        setCameraExposure,
        enableAutoExposure,
        switchFocusPoint,
      }}>
      {children}
    </CameraContext.Provider>
  );
};
