import { Link } from "react-router-dom";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ServicePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user-services",{withCredentials: true})
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div className="d-flex justify-content-center mt-4">
        <Link
          className="text-black rounded p-2"
          style={{ backgroundColor: "#ffaf38", textDecoration: "none" }}
          to="/account/service details/new"
        >
          + Add new service
        </Link>
      </div>
      <div className="mt-4">
        {services.length > 0 ? (
          services.map((service) => (
            <Link
              to={`/account/service details/${service._id}`}
              key={service._id}
              className="d-flex flex-column mt-4"
            >
              <div className="d-flex justify-content-start align-items-start pointer">
                {service.photos.length > 0 && (
                  <img
                    src={`http://localhost:4000/uploads/${service.photos[0]}`}
                    alt={service.name}
                    className="img-fluid"
                    style={{
                      width: "150px",
                      height: "auto",
                      border: "1px solid #ddd",
                    }}
                  />
                )}
              </div>
              <div className="d-flex flex-column justify-content-start">
                <b>{service.name}:</b>
                <p>{service.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p style={{textAlign:"center"}}>No services found.</p>
        )}
      </div>
    </div>
  );
}