export const formatDate = (value) => {
  const date = new Date(value ?? Date.now());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};
// export const formatTime = (value) => {
//   const date = new Date(value ?? Date.now());
//   const hour = date.getHours().toString().padStart(2, "0");
//   const minute = date.getMinutes().toString().padStart(2, "0");
//   const formattedTime = `${hour}:${minute}`;
//   return formattedTime;
// };
// export const formatDay = (value) => {
//   const date = new Date(value ?? Date.now());
//     const month = date
//       .toLocaleDateString("fr", { weekday: "long" })
//     const year = date.getFullYear();
//     return `${month[0].toUpperCase() + month.slice(1)}`;
// };
