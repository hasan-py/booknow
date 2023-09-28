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
import { useForm } from "react-hook-form";

export default function FlightHotelForm() {
  const form = useForm({
    shouldUnregister: true,
    defaultValues: { ...initDataFlightHotel },
    resolver: yupResolver(flighHotelFormSchema),
  });

  const [bookingType] = form.watch(["bookingType"]);

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <div className="w-full md:w-1/2 p-4 md:p-8">
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
        <div className="space-y-2">
          <div>
            <CustomInput
              formSetup={form}
              label="Check-In Date"
              name="checkInDate"
              type="date"
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Check-out Date"
              name="checkOutDate"
              type="date"
            />
          </div>

          <div>
            <CustomSelect
              label="City"
              name="city"
              formSetup={form}
              options={[
                {
                  value: "bangladesh",
                  label: "Bangladesh",
                },
                {
                  value: "India",
                  label: "India",
                },
              ]}
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Number of Rooms"
              name="numberOfRooms"
              type="number"
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Number of Children"
              name="numberOfChildren"
              type="number"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <CustomSelect
              label="Departure City"
              name="departureCity"
              formSetup={form}
              options={[
                {
                  value: "bangladesh",
                  label: "Bangladesh",
                },
                {
                  value: "India",
                  label: "India",
                },
              ]}
            />
          </div>

          <div>
            <CustomSelect
              label="Arrival City"
              name="arrivalCity"
              formSetup={form}
              options={[
                {
                  value: "bangladesh",
                  label: "Bangladesh",
                },
                {
                  value: "India",
                  label: "India",
                },
              ]}
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Departure Date"
              name="departureDate"
              type="date"
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Return Date"
              name="returnDate"
              type="date"
            />
          </div>

          <div>
            <CustomInput
              formSetup={form}
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
            />
          </div>

          <div>
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
