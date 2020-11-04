import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { useStateValue } from "./StateProvider";

export default function Login() {
  const { handleUser } = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => handleUser(result.user))
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"
        alt=""
      ></img>
      <div className="login__text">
        <h2>Sign in to Whatsapp</h2>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}
