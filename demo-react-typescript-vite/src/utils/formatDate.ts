import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const nameDay = ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"];

export function formatDateNameMonthYYYY(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string" && date.length
      ? new Date(date)
      : new Date();
  const yyyy = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex];
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${dd}${monthName}${yyyy}`;
}

export function formatDateNameMonthDY(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string" && date.length
      ? new Date(date)
      : new Date();
  const yyyy = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex];
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${monthName} ${dd}, ${yyyy}`;
}
export function formatDMMMYYYY(dateString?: string) {
  const dateObj =
    dateString && dateString !== "" ? new Date(dateString) : new Date();
  const yyyy = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex];
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${dd} ${monthName}, ${yyyy}`;
}

export function formatMDYAMPM(dateString: string) {
  const date = dateString !== "" ? new Date(dateString) : new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // let stringMinutes = minutes < 10 ? "0" + minutes : minutes;

  const dateNameMonthDY = formatDateNameMonthDY(dateString);

  const strTime = hours + ":" + minutes + " " + ampm;
  return `${dateNameMonthDY}, ${strTime}`;
}

export function formatMDYAMPMAtString(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string" && date.length
      ? new Date(date)
      : new Date();
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const stringMinutes = minutes < 10 ? "0" + minutes : minutes;
  const stringHours = hours < 10 ? "0" + hours : hours;

  const dateNameMonthDY = formatDateNameMonthDY(date);

  const strTime = stringHours + ":" + stringMinutes + " " + ampm;
  return `${dateNameMonthDY} at ${strTime}`;
}

export function formatDateNameMonthD(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string" && date.length
      ? new Date(date)
      : new Date();
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex];
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${monthName} ${dd}`;
}

export function formatDateNameDayDNameMonth(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string"
      ? new Date(date)
      : new Date();
  const nameDayWeek = nameDay[dateObj.getDate()];
  const monthIndex = dateObj.getMonth(); // Months start at 0!
  const monthName = months[monthIndex];
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${nameDayWeek} ${dd} ${monthName}`;
}

export function formatDateYYYYMMDDStrike(date?: Date | string) {
  const dateObj =
    date && typeof date === "object"
      ? date
      : date && typeof date === "string"
      ? new Date(date)
      : new Date();
  const yyyy = dateObj.getFullYear();
  let month: string | number = dateObj.getMonth() + 1; // Months start at 0!
  let dd: string | number = dateObj.getDate();

  if (dd < 10) dd = "0" + dd;
  if (month < 10) month = "0" + month;

  return `${yyyy}-${month}-${dd}`;
}