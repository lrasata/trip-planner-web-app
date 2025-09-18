import Typography from "@mui/material/Typography";
import BasicDatePicker from "@/shared/components/BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";
import TripLocationInputForm from "@/app/features/trip/components/inputs/TripLocationInputForm.tsx";
import Button from "@mui/material/Button";
import { ILocation, ITrip } from "@/types.ts";

interface EditDatesAndDestinationsProps {
  trip: ITrip;
  invalidDates: boolean;
  handleDateChange: (key: string) => (date: Dayjs | null) => void;
  handleLocationInputChange: (
    key: string,
  ) => (_event: any, selectedLocation: ILocation | null) => void;
  handleOnSave: () => void;
}
const EditDatesAndDestinations = ({
  trip,
  invalidDates,
  handleDateChange,
  handleLocationInputChange,
  handleOnSave,
}: EditDatesAndDestinationsProps) => {
  return (
    <>
      <Typography variant="h3" color="textSecondary">
        Dates & Destinations
      </Typography>
      <BasicDatePicker
        id="edit-departure-date-input"
        value={dayjs(trip.departureDate) ?? ""}
        label="Departure date"
        onChange={handleDateChange("departureDate")}
        hasError={invalidDates}
        helperText="Invalid date"
      />
      <TripLocationInputForm
        {...(trip.departureLocation && {
          departureLocation: trip.departureLocation,
        })}
        {...(trip.arrivalLocation && {
          arrivalLocation: trip.arrivalLocation,
        })}
        handleOnSelectDepartureLocation={handleLocationInputChange(
          "departureLocation",
        )}
        handleOnSelectArrivalLocation={handleLocationInputChange(
          "arrivalLocation",
        )}
      />
      <BasicDatePicker
        id="edit-return-date-input"
        value={dayjs(trip.returnDate) ?? ""}
        label="Return date"
        onChange={handleDateChange("returnDate")}
        hasError={invalidDates}
        helperText="Invalid date"
      />
      <Button
        id="save-edit-date-destination-btn"
        variant="contained"
        onClick={handleOnSave}
        disabled={!trip.name}
        sx={{ width: "max-content" }}
      >
        Save changes
      </Button>
    </>
  );
};

export default EditDatesAndDestinations;
