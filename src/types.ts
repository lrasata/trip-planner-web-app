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
  departureLocation?: ILocation;
  arrivalLocation?: ILocation;
  departureDate?: string;
  returnDate?: string;
  participantCount?: number;
  participants?: IUser[];
}

export interface ILocation {
  id?: number;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "PARTICIPANT";
}
