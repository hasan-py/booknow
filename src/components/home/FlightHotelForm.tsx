import { getCitiesData } from "@/api/getCities";
import {
  CustomButton,
  CustomCardSelect,
  CustomInput,
  CustomSelect,
} from "@/components/common";
import {
  flighHotelFormSchema,
  initDataFlightHotel,
} from "@/schema/flightHotelFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function FlightHotelForm() {
  const [cities, setCities] = useState([]);
  const form = useForm({
    shouldUnregister: true,
    defaultValues: { ...initDataFlightHotel },
    resolver: yupResolver(flighHotelFormSchema),
  });

  const router = useRouter();

  const [bookingType] = form.watch(["bookingType"]);

  const onSubmit = (data: any) => {
    if (data?.bookingType?.value === "hotel") {
      router.push(
        `hotel-search?city=${data?.city?.label}&travallers=${
          +data?.numberOfAdults + +data?.numberOfChildren
        }&rooms=${data?.numberOfRooms}&checkInDate=${
          data?.checkInDate
        }&checkOutDate=${data?.checkOutDate}`
      );
    } else {
      router.push(
        `flight-search?departureCity=${
          data?.departureCity?.label
        }&arrivalCity=${data?.arrivalCity?.label}&travallers=${
          +data?.numberOfAdults + +data?.numberOfChildren
        }&departureDate=${data?.departureDate}${
          data?.returnDate ? `&returnDate=${data?.returnDate}` : ""
        }`
      );
    }
  };

  useEffect(() => {
    (async () => {
      const cities = await getCitiesData();
      setCities(cities);
    })();
  }, []);

  return (
    <div className="w-full md:w-1/2 p-4 md:p-8 border md:m-4">
      <h1 className="text-center mb-8 text-xl font-bold text-orange-500">
        BookNow
      </h1>

      <div className="mt-4 mb-8">
        <CustomCardSelect
          formSetup={form}
          grid={2}
          options={[
            {
              value: "hotel",
              label: "Book Hotel",
            },
            {
              value: "flight",
              label: "Book Flight",
            },
          ]}
          name="bookingType"
        />
      </div>

      {bookingType?.value === "hotel" ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Check-In Date"
              name="checkInDate"
              type="date"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Check-out Date"
              name="checkOutDate"
              type="date"
            />
          </div>

          <div className="col-span-1">
            <CustomSelect
              label="City"
              name="city"
              formSetup={form}
              options={cities}
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Number of Rooms"
              name="numberOfRooms"
              type="number"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Number of Children"
              name="numberOfChildren"
              type="number"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <CustomSelect
              label="Departure City"
              name="departureCity"
              formSetup={form}
              options={cities}
            />
          </div>

          <div className="col-span-1">
            <CustomSelect
              label="Arrival City"
              name="arrivalCity"
              formSetup={form}
              options={cities}
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Departure Date"
              name="departureDate"
              type="date"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Return Date"
              name="returnDate"
              type="date"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
            />
          </div>

          <div className="col-span-1">
            <CustomInput
              formSetup={form}
              label="Number of Children"
              name="numberOfChildren"
              type="number"
            />
          </div>
        </div>
      )}

      <div className="my-8">
        <CustomButton onClick={form.handleSubmit(onSubmit)} title="Search" />
      </div>
    </div>
  );
}
