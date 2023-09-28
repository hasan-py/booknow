import { getFlightsData } from "@/api/getFlights";
import Image from "next/image";

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const flights = await getFlightsData();

  return (
    <div className="w-full md:w-1/2 p-4">
      <div className="flex text-sm space-x-4 justify-between my-4">
        <div className="flex items-center space-x-2 border py-2 px-6 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <div>
            <p>Going to</p>
            <p>{searchParams?.arrivalCity}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 border py-2 px-6 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>

          <div>
            <p>Date</p>
            <p>
              {searchParams?.departureDate} {searchParams?.returnDate || ""}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 border py-2 px-6 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>

          <div>
            <p>Travellars</p>
            <p>{searchParams?.travallers} Travellars</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {flights?.map((item: any, key: number) => (
          <div key={key} className="flex border rounded">
            <div>
              <Image
                width={200}
                height={200}
                src={item?.airlineLogo}
                alt="hotel"
                className="rounded"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{item?.airline}</h3>
              <span>USD {item?.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
