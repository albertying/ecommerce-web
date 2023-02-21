// import "../css/login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { useUserContext } from "../context/UserContext";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const FormInput = styled.input`
  width: 300px;
  padding: 15px;
  margin: 10px 0 20px 0;
  border: 0;
  border-radius: 5px;
  background-color: #1b2432;
  color: white;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 330px;
  padding: 15px;
  margin: 10px 0 20px 0;
  border: 0;
  border-radius: 5px;
  background-color: #403f4c;
  color: white;
  cursor: pointer;
`;

const ChangeAnchor = styled.a`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const { user, conditionals, login, register } = useUserContext();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [member, setMember] = useState({
    member: true,
  });

  useEffect(() => {
    if (user.id) {
      navigate("/");
    }
  }, [user.id, navigate]);

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
    <Wrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <h1>{member.member ? "Login" : "Register"}</h1>

        <label htmlFor="email">Email address</label>
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          value={userCredentials.email}
          onChange={handleChange}
          required
        ></FormInput>

        <label htmlFor="password">Password</label>
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={handleChange}
          required
        ></FormInput>

        <SubmitButton type="submit">Submit</SubmitButton>

        <p>
          {member.member ? (
            <span>Don&apos;t have an account?</span>
          ) : (
            <span>Already have an account?</span>
          )}{" "}
          Click{" "}
          <ChangeAnchor
            onClick={() => {
              setMember({
                ...member,
                member: !member.member,
              });
            }}
          >
            here
          </ChangeAnchor>
          .
        </p>
        {conditionals.alert.show ? <Alert /> : null}
      </FormWrapper>
    </Wrapper>
  );
}
export default Login;
