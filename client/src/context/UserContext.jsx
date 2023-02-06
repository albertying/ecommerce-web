import { createContext, useContext, useReducer } from "react";

import axios from "axios";

const initialState = {
  user: "",
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          user: action.payload,
        };
      case "REGISTER":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: "" };
      default:
        throw new Error(`no such action: ${action.type}`);
    }
  });

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (data.error && data.error === "User does not exist") {
        console.log("create an error one dday");
      }

      if (data.error && data.error === "Password is incorrect") {
        console.log("create an error one dddday");
      }

      console.log(data);

      dispatch({ type: "LOGIN", payload: data.user_id });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
      });

      if (data.error && data.error === "User already exists") {
        console.log("create an error one day");
      }

      dispatch({ type: "REGISTER", payload: data.user_id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ ...state, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
