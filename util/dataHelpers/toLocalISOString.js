const toLocalISOString = (date) => {
  date = new Date(date).getTime();
  const timeOffset = new Date().getTimezoneOffset() * 60000;

  const localISOTime = new Date(date - timeOffset).toISOString();
  return localISOTime;
};

export default toLocalISOString;