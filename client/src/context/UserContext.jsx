import { createContext, useContext, useReducer, useEffect } from "react";

import axios from "axios";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const itemCount = parseInt(localStorage.getItem("itemCount"));

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
  cart: {
    itemCount: itemCount ? itemCount : 0,
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
            id: action.payload.id,
          },
          token: action.payload.token,
        };
      case "REGISTER":
        return {
          ...state,
          user: {
            id: action.payload.id,
          },
          token: action.payload.token,
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
      case "ADD_TO_CART":
        return {
          ...state,
          cart: {
            itemCount: state.cart.itemCount + 1,
          },
        };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: {
            itemCount: state.cart.itemCount - 1,
          },
        };
      case "SET_CART_COUNT":
        return {
          ...state,
          cart: {
            itemCount: action.payload,
          },
        };

      case "CLEAR_CART":
        return {
          ...state,
          cart: {
            itemCount: 0,
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

  const getCartCount = async (token) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/orders/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.error && data.error === "jwt malformed") {
        return;
      }

      localStorage.setItem("itemCount", data.length);

      dispatch({ type: "SET_CART_COUNT", payload: data.length });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCount(token);
  }, []);

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

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      getCartCount(data.token);

      dispatch({
        type: "LOGIN",
        payload: { id: data.userId, token: data.token },
      });
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

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);

      getCartCount(data.token);

      dispatch({
        type: "REGISTER",
        payload: { id: data.userId, token: data.token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("itemCount");
    dispatch({ type: "LOGOUT" });
  };

  const addToCart = () => {
    localStorage.setItem("itemCount", state.cart.itemCount + 1);
    dispatch({ type: "ADD_TO_CART" });
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
