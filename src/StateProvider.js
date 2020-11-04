import React from "react";

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
  const [user, setuser] = React.useState(null);
  const handleUser = (newUser) => {
    setuser(newUser);
  };

  return (
    <StateContext.Provider value={{ user, handleUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => React.useContext(StateContext);
