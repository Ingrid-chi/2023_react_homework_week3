import axios from "axios";
import { useState } from "react";
import { SIGN_UP } from "../api/api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const signUp = async () => {
    try {
      const response = await axios.post(SIGN_UP, {
        email,
        password,
        nickname,
      });
      setMessage(`註冊成功. UID: ${response.data.uid}`);
    } catch (error) {
      console.log({ error });
      // setMessage(`${error.message}`);
      setMessage(
        `註冊失敗: Request failed with status code ${error.response.status}`
      );
    }
  };

  return (
    <div className="sign-up-wrapper">
      <h3>註冊</h3>
      <div className="inputs-wrapper">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={() => signUp()}>Sign Up</button>
        <p>{message}</p>
      </div>
      {/* <p>{message}</p> */}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default SignUp;
