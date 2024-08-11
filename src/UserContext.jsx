import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/profile", { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;