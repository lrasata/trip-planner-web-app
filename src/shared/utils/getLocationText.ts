import { ILocation } from "@/types";

export default function getLocationText(location: ILocation | undefined) {
  if (location) {
    return [location.city, location.region, location.country]
      .filter(Boolean)
      .join(", ");
  }
  return undefined;
}
