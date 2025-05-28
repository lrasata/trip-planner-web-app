import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { ITrip } from "../types.ts";
dayjs.extend(utc);

export const formatDate = (date: Dayjs): string => {
  // get the date only
  const dateOnly = dayjs(date).format("YYYY-MM-DD");
  return dayjs.utc(dateOnly).startOf("day").toISOString(); // transform in UTC midnight without timezone math ex: 2025-04-27T00:00:00.000Z (for the backend to work)
};

export const updateItemById = (
  list: ITrip[],
  id: ITrip["id"],
  newData: Partial<ITrip>,
): ITrip[] =>
  list.map((item) => (item.id === id ? { ...item, ...newData } : item));

export const existsById = (list: ITrip[], id: ITrip["id"]): boolean =>
  list.some((item) => item.id === id);

export const removeItemById = (
  items: ITrip[],
  idToRemove: ITrip["id"],
): ITrip[] => items.filter((item) => item.id !== idToRemove);
