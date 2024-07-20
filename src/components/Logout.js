import React, { useContext } from "react";

import Home from "./Home.js";
import Context from "../context/context.js";

function Logout() {
  const context = useContext(Context);
  const { setLogin } = context;
  setLogin(false);
  document.getElementById("login").style.display = "block";
  document.getElementById("logout").style.display = "none";
  return (
    <div>
      <Home />
    </div>
  );
}

export default Logout;