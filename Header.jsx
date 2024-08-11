import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "./src/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <nav
      className="navbar navbar-expand-lg text-success-emphasis"
      style={{ backgroundColor: "#232f3e", padding: "2px" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none d-flex align-items-center">
          <FontAwesomeIcon
            icon={faCar}
            style={{ fontSize: "2em", color: "#ff9900", marginLeft: "10px" }}
          />
          <span className="fw-bold fs-3 text-white ms-2">Vehicle Care</span>
        </Link>

        <form
          className="d-flex justify-content-center align-items-center"
          role="search"
        >
          <Link to="/" className="text-decoration-none">
            <button
              className="btn btn-outline-success mx-2"
              type="button"
              style={{ backgroundColor: "#ffd814", color: "black" }}
            >
              Home
            </button>
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            className="text-decoration-none"
          >
            <div>
              <FontAwesomeIcon style={{ color: "white" }} icon={faUser} />
            </div>
            <div className="d-block ms-1">
              {!!user && <div className="text-white">{user.name}</div>}
            </div>
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Header;
