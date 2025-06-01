import { ReactElement } from "react";

export interface IStep {
  label: string;
  description?: string;
  component?: ReactElement;
}

export interface ITrip {
  id?: number;
  name: string;
  description?: string;
  departureLocation?: string;
  arrivalLocation?: string;
  departureDate?: string;
  returnDate?: string;
}

export interface City {
  id?: number;
  name: string;
  country: string;
}
