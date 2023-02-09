import { createContext, useContext, useReducer } from "react";

import axios from "axios";

const initialState = {
  user: "",
  conditionals: {
    alert: {
      show: false,
      message: "",
    },
  },
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
      case "SHOW_ALERT":
        return {
          ...state,
          conditionals: {
            alert: {
              show: true,
              message: action.payload,
            },
          },
        };
      case "HIDE_ALERT":
        return {
          ...state,
          conditionals: {
            alert: {
              show: false,
              message: "",
            },
          },
        };
      default:
        throw new Error(`no such action: ${action.type}`);
    }
  }, initialState);

  const alert = (alertMessage) => {
    if (state.conditionals.alert.show) return;
    dispatch({ type: "SHOW_ALERT", payload: alertMessage });
    setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 3000);
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (data.error && data.error === "User does not exist") {
        console.log("User does not exist");
        alert("User does not exist");
      }

      if (data.error && data.error === "Password is incorrect") {
        console.log("Password is incorrect");
        alert("Password is incorrect");
      }

      console.log(data);

      localStorage.setItem("token", data.token);

      dispatch({ type: "LOGIN", payload: data.user });
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
        console.log("User already exists");
        alert("User already exists");
      }

      console.log(data);

      localStorage.setItem("token", data.token);

      dispatch({ type: "REGISTER", payload: data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
