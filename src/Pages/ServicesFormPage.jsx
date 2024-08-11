import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../Perks.jsx";
import PhotosUploader from "../PhotosUploader.jsx";
import AccountNavigation from "./AccountNavigation.jsx";

export default function ServicesFormPage() {
  const { _id } = useParams();
  console.log({ _id });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!_id) return;
      
    axios
      .get("http://localhost:4000/services/" + _id ,{withCredentials: true})
      .then((response) => {
        const { data } = response;
        if (data) {
          setName(data.name);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setCheckIn(data.checkIn);
          setPrice(data.price);
          setCheckOut(data.checkOut);
        } else {
          console.error("Service data is undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
      });
  }, [_id]);

  function inputHeader(text) {
    return <label className="text-2xl mt-4">{text}</label>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveService(ev) {
    ev.preventDefault();
    const serviceData = {
      _id,
      name,
      address,
      addedPhotos,
      description,
      perks,
      price,
      checkIn,
      checkOut,
    };

    try {
      let response;
      if (_id) {
        response = await axios.put(
          "http://localhost:4000/services",
         _id,...serviceData,
          {withCredentials: true}
        );
        console.log("put id",{ _id });
      } else {
        response = await axios.post(
          "http://localhost:4000/services",
          serviceData,
           {withCredentials: true},
        );
        console.log("post id",{ _id });
      }

      console.log("Service saved successfully:", response.data);
      setRedirect(true);
    } catch (error) {
      console.error("Error saving service:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("General error:", error.message);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/service details"} />;
  }

  return (
    <div className="container text-start mt-1" style={{ objectFit: "cover" }}>
      <AccountNavigation />
      <h1 className="mb-4">Vehicle Care Form </h1>
      <form onSubmit={saveService}>
        <div className="mb-3">
          {preInput("Name")}
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="write your name here"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          {preInput("Address")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="write your address here"
            className="form-control"
          />
        </div>
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div className="text-start">{preInput("Descriptions")}</div>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="text-muted mt-3 rounded"
          rows="5"
          cols="100"
          placeholder="Description about the service details..."
        />
        <div>
          {preInput("Select your Perks")}
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <div className="mt-3">
          {preInput("Check-in & Check-Out")}
          <div className="row">
            <div className="col">
              <p className="mb-2">Check-in:</p>
              <input
                type="time"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="form-control mt-2"
              />
            </div>
            <div className="col">
              <p className="mb-2">Check-out:</p>
              <input
                type="time"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="form-control mt-2"
              />
            </div>
            <div className="col">
              <p className="mb-2">Price:</p>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                className="form-control mt-2"
              />
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-warning w-30 mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}