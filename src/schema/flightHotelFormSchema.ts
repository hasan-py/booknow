import * as yup from "yup";

export const initDataFlightHotel = {
  bookingType: {
    value: "hotel",
    label: "Book Hotel",
  },
  checkInDate: "",
  checkOutDate: "",
  numberOfRooms: "1",
  numberOfAdults: "",
  numberOfChildren: "0",
  city: {},
  departureCity: {},
  arrivalCity: {},
  departureDate: "",
  returnDate: "",
};

const citySchema = (name: string) =>
  yup.object().shape({
    value: yup.string().required(`${name || "Field"} is required`),
    label: yup.string().required(`${name || "Field"} is required`),
  });

export const flighHotelFormSchema = yup.object().shape({
  bookingType: yup.object().shape({
    value: yup.string(),
    label: yup.string(),
  }),
  numberOfChildren: yup.string().required("Number of children is required"),
  numberOfAdults: yup.string().required("Number of adults is required"),

  // Hotel
  checkInDate: yup.string().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "hotel"
      ? schema.required("Check-In date is required")
      : schema.optional();
  }),
  checkOutDate: yup.string().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "hotel"
      ? schema.required("Check-Out date is required")
      : schema.optional();
  }),
  numberOfRooms: yup.string().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "hotel"
      ? schema.required("Number of rooms is required")
      : schema.optional();
  }),
  city: yup.object().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "hotel"
      ? citySchema("City")
      : schema.optional();
  }),

  // Flight
  departureCity: yup.object().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "flight"
      ? citySchema("Departure city")
      : schema.optional();
  }),
  arrivalCity: yup.object().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "flight"
      ? citySchema("Departure city")
      : schema.optional();
  }),
  departureDate: yup.string().when("bookingType", ([bookingType], schema) => {
    return bookingType?.value === "flight"
      ? schema.required("Departure date is required")
      : schema.optional();
  }),
  returnDate: yup.string().optional(),
});
