import React, { useState, useEffect, useReducer } from "react";
import Colors from "./colors";
import styled from "styled-components";
import { ReactComponent as LuceAccesa } from "../assets/luce-accesa.svg";
import { ReactComponent as LuceSpenta } from "../assets/luce-spenta.svg";
import { ReactComponent as ClapAcceso } from "../assets/clap-acceso.svg";
import { ReactComponent as ClapSpento } from "../assets/clap-spento.svg";
import { ReactComponent as SoundAcceso } from "../assets/sound-acceso.svg";
import { ReactComponent as SoundSpento } from "../assets/sound-spento.svg";
import LightAmount from "./light-amount.component";
import Api from "../services/mqtt.service";

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

const Home = ({ data }) => {
  const [brightness, setBrightness] = useState();
  const [luce, setLuce] = useReducer(reducer, false);
  const [clap, setClap] = useReducer(reducer, false);
  const [sound, setSound] = useReducer(reducer, false);

  const on_message = (topic, message) => {
    if (topic.toString() === "current/leds") {
      const [l, c, s] = message
        .toString()
        .split(" ")
        .map((s) => parseInt(s));
      console.log("MCU Led State: ", l, c, s);
      setLuce({ type: l ? "SET" : "RESET" });
      setClap({ type: c ? "SET" : "RESET" });
      setSound({ type: s ? "SET" : "RESET" });
    } else if (topic.toString() === "current/light") {
      const b = parseFloat(message);
      console.log("Brightness Detected: ", b);
      setBrightness(b);
    }
  };

  useEffect(() => {
    Api.setOnMessage(on_message);
  }, []);

  return (
    <HomeContainer>
      {data && data.map((message) => <p>{message}</p>)}
      <StatusBlock>
        <Card onClick={() => Api.publishLuce(!luce)}>
          {luce ? (
            <LuceAccesa style={{ height: 150 }} />
          ) : (
            <LuceSpenta style={{ height: 150 }} />
          )}
        </Card>
        {brightness !== undefined ? (
          <LightAmount brightness={brightness} />
        ) : (
          <></>
        )}
      </StatusBlock>
      <ModeBlock>
        <ModeCardBlock>
          <Card onClick={() => Api.publishMode(!clap, sound)}>
            {clap ? (
              <ClapAcceso style={{ height: 150 }} />
            ) : (
              <ClapSpento style={{ height: 150 }} />
            )}
          </Card>
          <Card onClick={() => Api.publishMode(clap, !sound)}>
            {sound ? (
              <SoundSpento style={{ height: 150 }} />
            ) : (
              <SoundAcceso style={{ height: 150 }} />
            )}
          </Card>
        </ModeCardBlock>
        <ChangeModeButton onClick={() => Api.publishChangeMode()}>
          <ChangeModeText>Change Mode!</ChangeModeText>
        </ChangeModeButton>
      </ModeBlock>
    </HomeContainer>
  );
};

export default Home;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 100px;
  background-color: ${Colors.lightorange};
  height: 100%;
  min-height: 600px;
`;

export const Card = styled.div`
  display: flex;
  height: 300px;
  width: 250px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.nyanza};
  box-shadow: rgb(235, 235, 235) 0px 10px 0px;
  cursor: pointer;
  :active {
    margin-top: 10px;
    box-shadow: rgb(235, 235, 235) 0px 0px 0px;
    transition: 0.15s;
  }
`;

export const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: 65%;
`;

export const ModeBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 65%;
  align-items: center;
`;

export const ModeCardBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

export const ChangeModeButton = styled.div`
  display: flex;
  height: 70px;
  width: 60%;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkpurple};
  box-shadow: ${Colors.darkpurpleshadow} 0px 8px 0px;
  cursor: pointer;
  :active {
    margin-bottom: -8px;
    box-shadow: ${Colors.darkpurpleshadow} 0px 0px 0px;
    transition: 0.15s;
  }
`;

export const ChangeModeText = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: ${Colors.nyanza};
`;
