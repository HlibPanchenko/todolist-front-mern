function parseDate(dateString) {
  const [day, month, year] = dateString.split("-");
  return {
    date: parseInt(day),
    month: parseInt(month),
    year: parseInt(year),
  };
}

// Example usage
//  const dateStr = "17-04-2023";
//  const parsedDate = parseDate(dateStr);
//  console.log(parsedDate); // Outputs: { date: 17, month: 4, year: 2023 }

export function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // JavaScript months start from 0, so add 1
  const year = today.getFullYear();

  // Pad day and month with leading zero if needed
  const paddedDay = day < 10 ? "0" + day : day;
  const paddedMonth = month < 10 ? "0" + month : month;

  //   return `${paddedDay}-${paddedMonth}-${year}`;
  return parseDate(`${paddedDay}-${paddedMonth}-${year}`);
}

export function currentDate(change) {
  let today = new Date();
  let formattedDate = today.toISOString().slice(0, 10); // gives format y-m-d
  let oneDayAgo = new Date(formattedDate);
  oneDayAgo.setDate(oneDayAgo.getDate() + change);
  let formattedDayAgo = oneDayAgo.toISOString().slice(0, 10); // gives format y-m-d
  const [year, month, date] = formattedDayAgo.split("-").map(Number);
  const objDayAgo = { date, month, year }; // gives format { date: 30, month: 3, year: 2023 }
  return objDayAgo;
}
