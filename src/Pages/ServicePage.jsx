import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function ServicesPage() {
  const { _id } = useParams();
  console.log(_id);
  const [service, setService] = useState(null);

  useEffect(() => {
    if (!_id) {
      return;
    }
    axios.get(`http://localhost:4000/services/${_id}`,{withCredentials: true}).then((response) => {
      setService(response.data);
    });

    // Example: Get the user ID from local storage
  }, [_id]);

  if (!service) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div className="mt-4 bg-light">
      <h5 className="text-start bg-warning border p-2">{service.name}</h5>
      <div className="row">
        <div className="col-8">
          <div>
            {service.photos?.[0] && (
              <img
                src={`http://localhost:4000/uploads/${service.photos?.[0]}`}
                alt={service.name}
                className="img-fluid"
                style={{
                  height: "auto",
                  width: "100%",
                  border: "1px solid #ddd",
                }}
              />
            )}
            <div className="d-flex">
              Check-in : {service.checkIn}
              <br />
              Check-out : {service.checkOut}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="mt-5">
            <i className="fa-regular fa-font-awesome">{service.description}</i>
            <h3 className="mt-4">What we Included?</h3>
            <div>
              <ul className="list-group">
                <li className="list-group-item list-group-item-primary">
                  Battery Check
                </li>
                <li className="list-group-item list-group-item-primary">
                  Accelerator, Clutch & Brakes Check
                </li>
                <li className="list-group-item list-group-item-primary">
                  Electricals Check
                </li>
                <li className="list-group-item list-group-item-primary">
                  Tyre Rotation
                </li>
                <li className="list-group-item list-group-item-primary">
                  Wheel Balancing & Alignment & more
                </li>
              </ul>
            </div>
            <div>
              <BookingWidget service={service} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}