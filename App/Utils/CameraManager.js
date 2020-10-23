import React, {useState, createContext} from 'react';

export const CameraContext = createContext(-1);

export const CameraContextProvider = ({children}) => {
  const [exposure, setExposure] = useState(-1);

  const setCameraExposure = (value) => {
    setExposure(value);
  };

  const enableAutoExposure = () => {
    setExposure(-1);
  };

  return (
    <CameraContext.Provider
      value={{exposure, setCameraExposure, enableAutoExposure}}>
      {children}
    </CameraContext.Provider>
  );
};
