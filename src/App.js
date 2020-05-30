import React, { useState, useEffect, useReducer } from "react";
import { AppContext } from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header.component";
import Body from "./components/body.component";
import styled from "styled-components";
import Api from "./services/mqtt.service";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return true;
    case "RESET":
      return false;
    case "TOGGLE":
      return !state;
    default:
      throw new Error();
  }
};

function App() {
  const [mcuConnected, setMcuConnected] = useState();
  const [brightness, setBrightness] = useState();
  const [luce, setLuce] = useReducer(reducer, false);
  const [clap, setClap] = useReducer(reducer, false);
  const [sound, setSound] = useReducer(reducer, false);
  const [DNDEnabled, setDNDEnabled] = useState(false);
  const [DNDActive, setDNDActive] = useState(false);
  const [oraInizio, setOraInizio] = useState("00:00");
  const [oraFine, setOraFine] = useState("00:00");
  const getContext = {
    mcuConnected,
    brightness,
    luce,
    clap,
    sound,
    DNDEnabled,
    setDNDEnabled,
    DNDActive,
    oraInizio,
    setOraInizio,
    oraFine,
    setOraFine,
  };

  const on_message = (topic, message) => {
    switch (topic.toString()) {
      case "current/leds":
        const [l, c, s] = message
          .toString()
          .split(" ")
          .map((s) => parseInt(s));
        console.log("MCU Led State:", l, c, s);
        setLuce({ type: l ? "SET" : "RESET" });
        setClap({ type: c ? "SET" : "RESET" });
        setSound({ type: s ? "SET" : "RESET" });
        break;

      case "current/light":
        const b = parseFloat(message);
        console.log("Brightness Detected:", b);
        setBrightness(b);
        break;

      case "current/connected":
        console.log("MCU connected:", message.toString());
        const connected = message.toString() === "True" ? true : false;
        setMcuConnected(connected);
        break;

      case "current/dnd":
        console.log("DND active:", message.toString());
        const active = message.toString() === "True" ? true : false;
        setDNDActive(active);
        break;

      case "dnd/enabled":
        if (!Api.publishedDNDEnabled) {
          const enabled = message.toString() === "true" ? true : false;
          console.log("DNDEnabled:", enabled);
          setDNDEnabled(enabled);
        }
        break;

      case "dnd/times":
        if (!Api.publishedDNDTimes) {
          const [inizio, fine] = message.toString().toString().split(" ");
          console.log("Fascia Oraria DND:", inizio, fine);
          setOraInizio(inizio);
          setOraFine(fine);
        }
        break;

      default:
        console.log(
          `Messaggio non gestito da topic ${topic.toString()}, messaggio ${message.toString()}`
        );
        break;
    }
  };

  useEffect(() => {
    Api.setOnMessage(on_message);
  }, []);

  return (
    <>
      <Router>
        <AppContext.Provider value={getContext}>
          <AppContainer>
            <Header mcuConnected={mcuConnected} />
            <Body />
          </AppContainer>
        </AppContext.Provider>
      </Router>
    </>
  );
}

export default App;

export const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
