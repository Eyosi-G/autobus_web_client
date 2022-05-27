export const convertTo12 = (H) => {
  let h = H % 12 || 12;
  h = h < 10 ? "0" + h : h;
  const ampm = H < 12 ? " AM" : " PM";
  return h + ":00 " + ampm;
};
