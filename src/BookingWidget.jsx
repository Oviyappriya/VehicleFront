/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookingWidget = ({ service }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisService() {
    try {
      const response = await axios.post("http://localhost:4000/bookings",  {
        checkIn,
        checkOut,
        name,
        phone,
        service: service._id,
        price: service.price,
      },{ withCredentials: true });
      const bookingId = response.data._id;
      setRedirect("/account/bookings/" + bookingId);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div
      className="container mt-4 border"
      style={{
        backgroundColor: "#ffc107",
        height: "auto",
        width: "400px",
        padding: "20px",
      }}
    >
      <b style={{ textDecoration: "underline" }}>Price : {service.price}</b>{" "}
      <br />
      <div className="row mt-3 mb-3">
        <label className="col-12 col-md-4">
          <b>CheckIn:</b>
        </label>
        <div className="col-12 col-md-8">
          <input
            type="date"
            className="form-control"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-md-4">
          <b>CheckOut:</b>
        </label>
        <div className="col-12 col-md-8">
          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-md-4">
          <b>Name:</b>
        </label>
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12 col-md-4">
          <b>Mobile:</b>
        </label>
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={bookThisService}
          className="btn btn-light mt-3"
          style={{ height: "50px", width: "150px" }}
        >
          Book this Service
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;