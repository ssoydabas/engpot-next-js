const setDeviceScreenMode = (dimensions, setDevice) => {
  if (dimensions) {
    const { width } = dimensions;

    const device = width < 481 ? "mobile" : "desktop";

    setDevice(device);
  }
};

export default setDeviceScreenMode;
