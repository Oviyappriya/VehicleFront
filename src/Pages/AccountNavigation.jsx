import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faTaxi } from "@fortawesome/free-solid-svg-icons";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "inline-flex m-4 p-2";
    if (type === subpage) classes += " bg-muted text-white rounded";

    return classes;
  }
  return (
    <nav className="d-flex justify-center   p-3">
      <Link
        className={linkClasses("profile")}
        style={{
          textDecoration: "none",
          color: "black",
          backgroundColor: "#ffaf38",
        }}
        to={"/account"}
      >
        My Profile
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{ marginLeft: "5px" }}
          size="sm"
        />
      </Link>

      <Link
        className={linkClasses("service details")}
        style={{
          textDecoration: "none",
          color: "black",
          backgroundColor: "#ffaf38",
        }}
        to={"/account/service details"}
      >
        My ServiceDetails
        <FontAwesomeIcon
          icon={faTaxi}
          style={{ marginLeft: "5px", color: "black" }}
        />
      </Link>
      <Link
        className={linkClasses("bookings")}
        style={{
          textDecoration: "none",
          color: "black",
          backgroundColor: "#ffaf38",
        }}
        to={"/account/bookings"}
      >
        My bookings
        <FontAwesomeIcon
          icon={faBook}
          style={{ marginLeft: "5px", color: "black" }}
        />
      </Link>
    </nav>
  );
}