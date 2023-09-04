import axios from "axios";
import { useState } from "react";
import { CHECK_OUT } from "../api/api";

const CheckOut = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const checkOut = async () => {
    try {
      const response = await axios.get(CHECK_OUT, {
        headers: {
          Authorization: token,
        },
      });
      setMessage(`驗證成功 UID: ${response.data.uid}`);
    } catch (error) {
      setMessage(
        `驗證失敗: Request failed with status code ${error.response.status}`
      );
    }
  };

  return (
    <div className="sign-up-wrapper">
      <h3>驗證</h3>
      <div className="inputs-wrapper">
        <input placeholder="Token" onChange={(e) => setToken(e.target.value)} />
        <button onClick={() => checkOut()}>Check Out</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CheckOut;
