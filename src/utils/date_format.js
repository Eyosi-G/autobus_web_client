export const toISOString = (date) => date.toISOString().split("T")[0];
export const toLongDate = (date) => {
  // January 12, 2021
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let fullYear = date.getFullYear();
  let day = date.getDate();
  return `${month} ${day}, ${fullYear}`;
};

export const getDate = (after = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + after);
  return now.toISOString().split("T")[0];
};
