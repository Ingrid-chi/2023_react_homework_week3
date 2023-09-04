import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CheckOut from "./components/CheckOut";
import SignOut from "./components/SignOut";
import TodoList from "./components/TodoList";

function App() {
  const [token, setToken] = useState("");
  console.log(token);

  return (
    <>
      <SignUp />
      <SignIn token={token} setToken={setToken} />
      <CheckOut />
      <SignOut />
      <hr />
      <TodoList token={token} />
    </>
  );
}

export default App;
