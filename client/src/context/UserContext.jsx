import { createContext, useContext, useReducer } from "react";

import axios from "axios";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const initialState = {
  user: {
    id: userId ? userId : null,
  },
  token: token ? token : null,
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
          user: {
            id: action.payload,
          },
        };
      case "REGISTER":
        return {
          ...state,
          user: {
            id: action.payload,
          },
        };
      case "LOGOUT":
        return {
          ...state,
          user: {
            id: null,
          },
          conditionals: { alert: { show: false } },
        };
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
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (data.error && data.error === "User does not exist") {
        console.log("User does not exist");
        alert("User does not exist");
        return;
      }

      if (data.error && data.error === "Password is incorrect") {
        console.log("Password is incorrect");
        alert("Password is incorrect");
        return;
      }

      console.log(data);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      dispatch({ type: "LOGIN", payload: data.userId });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          email,
          password,
        }
      );

      if (data.error && data.error === "User already exists") {
        console.log("User already exists");
        alert("User already exists");
        return;
      }

      console.log(data);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      dispatch({ type: "REGISTER", payload: data.userId });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
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
