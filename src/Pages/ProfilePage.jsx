import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import ServicePage from "./ServicesPage.jsx";
import AccountNavigation from "./AccountNavigation.jsx";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("http://localhost:4000/logout",{withCredentials: true});
    setRedirect("/");
    setUser(null);
  }
  if (!ready) {
    return "loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="d-flex flex-column align-items-center">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button onClick={logout} className="btn btn-warning mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "service details" && <ServicePage />}
    </div>
  );
}