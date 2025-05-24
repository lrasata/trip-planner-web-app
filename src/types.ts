import { ReactElement } from "react";

export interface IStep {
  label: string;
  description?: string;
  component?: ReactElement;
}

export interface ITrip {
  name: string;
  description?: string;
  city?: string;
  region?: string;
  country?: string;
  departureDate?: string;
  returnDate?: string;
}
