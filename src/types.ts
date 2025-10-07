import { ReactElement } from "react";

export interface IStep {
  label: string;
  description?: string;
  component?: ReactElement;
}

export interface ITripMetadata {
  tripId: number;
  fileKey: string;
  thumbnailKey: string;
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
  metadata: ITripMetadata[];
}

export interface ILocation {
  id?: number;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface IRole {
  name: "ROLE_SUPER_ADMIN" | "ROLE_ADMIN" | "ROLE_PARTICIPANT";
  description: string;
}

export interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password?: string;
  role: IRole;
}

export interface TripPaginatedResponse {
  content: ITrip[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface IPagination {
  currentPage: number;
  sizePerPage: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
}
