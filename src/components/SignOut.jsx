import axios from "axios";
import { useState } from "react";
import { SIGN_OUT } from "../api/api";

const SignOut = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const signOut = async () => {
    try {
      const response = await axios.post(SIGN_OUT, null, {
        headers: {
          Authorization: token,
        },
      });
      setMessage(`驗證成功 UID: ${response.data.message}`);
    } catch (error) {
      setMessage(
        `驗證失敗: Request failed with status code ${error.response.data.message}`
      );
    }
  };

  return (
    <div className="sign-up-wrapper">
      <h3>登出</h3>
      <div className="inputs-wrapper">
        <input placeholder="Token" onChange={(e) => setToken(e.target.value)} />
        <button onClick={() => signOut()}>Sign Out</button>
        <p>{message}</p>
      </div>
    </div>
  );
};
export default SignOut;
