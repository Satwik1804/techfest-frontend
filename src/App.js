import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import Events from "./components/Events.js";
import Competitions from "./components/Competitions.js";
import Workshops from "./components/Workshops.js";
import Stores from "./components/Stores.js";
import Login from "./components/Login.js";
import Alert from "./components/Alert.js";
import Logout from "./components/Logout.js";
import State from "./context/State.js";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <div>
      <State>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element=<Home /> />
              <Route exact path="/events" element=<Events /> />
              <Route exact path="/competitions" element=<Competitions /> />
              <Route exact path="/workshops" element=<Workshops /> />
              <Route exact path="/stores" element=<Stores /> />
              <Route
                exact
                path="/login"
                element=<Login showAlert={showAlert} />
              />
              <Route exact path="/logout" element=<Logout /> />
              <Route exact path="/techfest" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </State>
    </div>
  );
}

export default App;