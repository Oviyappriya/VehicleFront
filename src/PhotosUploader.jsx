import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos = [], onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post(
        "http://localhost:4000/upload-by-link", 
        { link: photoLink },{ withCredentials: true }
        );
      onChange((prev) =>
        Array.isArray(prev) ? [...prev, filename] : [filename]
      );

      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("http://localhost:4000/upload", { withCredentials: true }, data)
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) =>
          Array.isArray(prev) ? [...prev, ...filenames] : filenames
        );
      });
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="upload a photo of your damaged vehicle link....jpg"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          className="form-control"
          id="title"
        />
      </div>

      <div className="mb-3 d-flex flex-row ">
        <div className="mt-2">
          {Array.isArray(addedPhotos) &&
            addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div key={link} className="border-1 p-3 rounded-sm ">
                <img
                  style={{
                    objectFit: "cover",
                    width: "150px",
                    height: "150px",
                  }}
                  src={
                    "http://localhost:4000/uploads/" + link
                  }
                  alt=""
                />
                <div>
                  <button
                    onClick={(ev) => removePhoto(ev, link)}
                    className="rounded pointer"
                  >
                    Delete <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={(ev) => selectAsMainPhoto(ev, link)}
                    className="cursor-pointer absolute bottom-1 left-1 text-white  rounded-2xl m-2 py-2 px-2"
                    style={{ backgroundColor: "lightgrey" }}
                  >
                    {link === addedPhotos[0] && (
                      <FontAwesomeIcon
                        style={{ color: "#ffaf38" }}
                        icon={faStar}
                      />
                    )}
                    {link !== addedPhotos[0] && (
                      <FontAwesomeIcon icon={faStar} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          <div>
            <label>
              <input
                type="file"
                multiple
                className="d-none"
                onChange={uploadPhoto}
              />
              <div
                className="border p-5 "
                style={{ backgroundColor: "lightgray" }}
              >
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <span>Upload</span>
              </div>
            </label>
            <br />
            <button
              onClick={addPhotoByLink}
              className="btn btn-sm btn-outline-warning mt-2"
            >
              Add caption
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

PhotosUploader.propTypes = {
  addedPhotos: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};