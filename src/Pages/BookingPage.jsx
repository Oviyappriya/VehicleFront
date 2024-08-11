import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { _id } = useParams();
   console.log({_id})
  return (
    <div className="container mt-5">
      <div className="card border-primary">
        <div className="card-header bg-primary text-white">
          <b>Your Booking Successfully Completed</b>
        </div>
        <div className="card-body">
          <h2 className="card-title">Booking ID: {_id}</h2>
          <p className="card-text">
            We will contact you shortly for further details.
          </p>
          <p className="card-text">
            You can check your booking status on your{" "}
            
             
             <a href="/account/bookings" className="btn btn-link">
              bookings
            </a>{" "}page.
          </p>
          <p className="card-text">
            Please note that your booking will not be confirmed until we receive
            your payment.
          </p>
          <p className="card-text">Thank you for choosing us.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;