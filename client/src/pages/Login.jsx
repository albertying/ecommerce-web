import "../css/login.css";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Alert from "../components/Alert";

function Login() {
  const { user, conditionals, login, register } = useUserContext();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [member, setMember] = useState({
    member: true,
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userCredentials;
    if (member.member) {
      login(email, password);
    } else {
      register(email, password);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>{member.member ? "Login" : "Register"}</h1>
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
          {member.member ? (
            <span>Don't have an account?</span>
          ) : (
            <span>Already have an account?</span>
          )}{" "}
          Click{" "}
          <a
            onClick={() => {
              setMember({
                ...member,
                member: !member.member,
              });
            }}
          >
            here
          </a>
          .
        </p>
        {conditionals.alert.show ? <Alert /> : null}
        <h1>{JSON.stringify(user)}</h1>
      </form>
    </div>
  );
}
export default Login;
