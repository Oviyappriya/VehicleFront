import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={registerUser}>
            <div className="form-group">
              <input
                type="text"
                placeholder="John Doe"
                className="form-control"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control mt-4"
                placeholder="your@gmail.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mt-4"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Register
            </button>
            <div className=" pt-2 text-secondary">
              Already have account <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;