import axios from "axios";
// import PropTypes from "prop-types";
import { useState } from "react";
import { SIGN_IN } from "../api/api";

const SignIn = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signIn = async () => {
    try {
      const response = await axios.post(SIGN_IN, { email, password });
      setToken(response.data.token);
      setMessage("");
      localStorage.setItem("token", token);
    } catch (error) {
      setToken("");
      setMessage(
        `登入失敗: Request failed with status code ${error.response.status}`
      );
    }
  };

  // SignIn.propTypes = {
  //   token: PropTypes.string, // 請根據實際情況調整類型
  //   setToken: PropTypes.func, // 請根據實際情況調整類型
  // };

  return (
    <div className="sign-up-wrapper">
      <h3>登入</h3>
      <div className="inputs-wrapper">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => signIn()}>Sign In</button>
      </div>
      {token && <p>token: {token}</p>}
      {message}
    </div>
  );
};

export default SignIn;
