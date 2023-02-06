import "../css/login.css";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

function Login() {
  const { user, login, register } = useUserContext();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [conditionals, setConditionals] = useState({
    alert: true,
    member: true,
  });

  useEffect(() => {
    if (conditionals.alert) {
      setTimeout(() => {
        setConditionals({ ...conditionals, alert: false });
      }, 3000);
    }
  }, [conditionals.alert]);

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userCredentials;
    if (conditionals.member) {
      login(email, password);
    } else {
      register(email, password);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>{conditionals.member ? "Login" : "Register"}</h1>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          value={userCredentials.email}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={userCredentials.password}
            onChange={handleChange}
            required
          ></input>
        </label>

        <button type="submit">Submit</button>
        <p>
          {conditionals.member ? (
            <span>Don't have an account?</span>
          ) : (
            <span>Already have an account?</span>
          )}{" "}
          Click{" "}
          <a
            onClick={() => {
              setConditionals({
                ...conditionals,
                member: !conditionals.member,
              });
            }}
          >
            here
          </a>
          .
        </p>
        {conditionals.alert ? <h5>Email or password is incorrect.</h5> : null}
        <h1>{JSON.stringify(user)}</h1>
      </form>
    </div>
  );
}
export default Login;
