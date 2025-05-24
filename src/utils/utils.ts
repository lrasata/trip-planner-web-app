import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const formatDate = (date: Dayjs): string => {
  // get the date only
  const dateOnly = dayjs(date).format("YYYY-MM-DD");
  return dayjs.utc(dateOnly).startOf("day").toISOString(); // transform in UTC midnight without timezone math ex: 2025-04-27T00:00:00.000Z (for the backend to work)
};
