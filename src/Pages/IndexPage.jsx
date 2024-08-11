import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const brands = [
  { name: "Maruti", link: "/chennai/maruti/car/services-repair" },
  { name: "Hyundai", link: "/chennai/hyundai/car/services-repair" },
  { name: "Mahindra", link: "/chennai/mahindra/car/services-repair" },
  { name: "Honda", link: "/chennai/honda/car/services-repair" },
  { name: "Toyota", link: "/chennai/toyota/car/services-repair" },
  { name: "Renault", link: "/chennai/renault/car/services-repair" },
  { name: "Tata", link: "/chennai/tata/car/services-repair" },
  { name: "Ford", link: "/chennai/ford/car/services-repair" },
  { name: "Volkswagen", link: "/chennai/volkswagen/car/services-repair" },
  { name: "Nissan", link: "/chennai/nissan/car/services-repair" },
  { name: "Skoda", link: "/chennai/skoda/car/services-repair" },
  { name: "Chevrolet", link: "/chennai/chevrolet/car/services-repair" },
  { name: "Fiat", link: "/chennai/fiat/car/services-repair" },
  { name: "Mitsubishi", link: "/chennai/mitsubishi/car/services-repair" },
  { name: "Datsun", link: "/chennai/datsun/car/services-repair" },
  {
    name: "Mahindra Renault",
    link: "/chennai/mahindra-renault/car/services-repair",
  },
  { name: "Premier", link: "/chennai/premier/car/services-repair" },
  { name: "Force", link: "/chennai/force/car/services-repair" },
  {
    name: "Hindustan Motors",
    link: "/chennai/hindustan-motors/car/services-repair",
  },
  { name: "ICML", link: "/chennai/icml/car/services-repair" },
  { name: "Isuzu", link: "/chennai/isuzu/car/services-repair" },
  {
    name: "Mahindra Ssangyong",
    link: "/chennai/mahindra-ssangyong/car/services-repair",
  },
];

const IndexPage = () => {
  

  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/services",{withCredentials: true})
      
      .then((response) => {
        setServices([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  return (
    <div className="container">
      <div className="mt-4">
        <img
          src="https://etimg.etb2bimg.com/photo/78030839.cms"
          className="mt-0 img-fluid mx-auto d-block"
          alt="Description"
        />
      </div>
      <div className="mt-4 row">
        {services.length > 0 &&
          services.map((service) => (
            <div key={service._id} className="col-6 col-md-4 ">
              <Link
                to={"/service/" + service._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  to={`/service/${service._id}`}
                  className="text-decoration-none"
                >
                  {service.photos?.[0] && (
                    <img
                      src={`http://localhost:4000/uploads/${service.photos?.[0]}`}
                      style={{ objectFit: "cover" }}
                      className="aspect-square p-3 img-fluid"
                      alt={service.name}
                    />
                  )}

                  <h5
                    className="fw-bold large mt-2 p-2 text-start"
                    style={{ color: "black" }}
                  >
                    {service.name}
                  </h5>
                  <p className="text-muted text-start p-2">
                    {service.description}
                  </p>

                  <div className="text-start p-2">
                    <span
                      className="fw-bold border mt-1 p-2"
                      style={{ color: "black", backgroundColor: "#FFD814" }}
                    >
                      Rs : {service.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div
        style={{ background: "#3e3e3e", color: "white" }}
        className="p-4 mt-4"
      >
        <h2 className="text-center my-4 ">Brands Serviced By Us</h2>
        <p className="text-center mb-4">
          Choose from OEM Authorized Service Centers, Multi Brand Garages and
          Trusted Local Mechanics
        </p>
        <div
          style={{
            borderBottom: "1px solid rgb(221, 221, 221)",
            width: "89%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {brands.map((brand, index) => (
              <li key={index} style={{ margin: "0 10px" }}>
                <a
                  href={brand.link}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {brand.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer>
        <p className="text-center mt-4">
          �� 2022 Vehicle Care. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default IndexPage;