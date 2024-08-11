import AccountNavigation from "./AccountNavigation";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/bookings", {withCredentials: true}).then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div className="container mt-4">
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="card mb-4">
              <div
                className="card-header"
                style={{ backgroundColor: "lightyellow" }}
              >
                <h3 className="m-0">{booking.service?.name}</h3>
              </div>
              <div className="card-body">
                <p>
                  <b>Name:</b> {booking.name}
                </p>
                <p>
                  <b>CheckIn:</b> {format(new Date(booking.checkIn), "PP")}
                </p>
                <p>
                  <b>CheckOut:</b> {format(new Date(booking.checkOut), "PP")}
                </p>
                <p>
                  <b>Price:</b> {booking.price}
                </p>
                <div style={{ color: "blue" }}>
                  You have Successfully Booked
                </div>
                <p>
                  <b>Thank you for booking!</b>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;