const today = new Date();
const hours = today.getHours();
const minutes = today.getMinutes();
const years = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const chatTime = `${hours}:${minutes} ${hours > 12 ? 'AM' : 'PM'}`;
const chatDate = `${years}-${month}-${day}`;

export {chatTime, chatDate};
