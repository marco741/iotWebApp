import React, { useContext } from "react";
import { AppContext } from "../context";
import Colors from "./colors";
import styled from "styled-components";
import { ReactComponent as LuceAccesa } from "../assets/luce-accesa.svg";
import { ReactComponent as LuceSpenta } from "../assets/luce-spenta.svg";
import { ReactComponent as ClapAcceso } from "../assets/clap-acceso.svg";
import { ReactComponent as ClapSpento } from "../assets/clap-spento.svg";
import { ReactComponent as SoundAcceso } from "../assets/sound-acceso.svg";
import { ReactComponent as SoundSpento } from "../assets/sound-spento.svg";
import { ReactComponent as DoNotDisturb } from "../assets/do-not-disturb.svg";
import LightAmount from "./light-amount.component";
import Api from "../services/mqtt.service";

const Home = () => {
  const { mcuConnected, brightness, luce, clap, sound, DNDActive } = useContext(
    AppContext
  );

  return (
    <HomeContainer>
      <UpperContainer>
        <StatusBlock>
          <Card disabled={!mcuConnected} onClick={() => Api.publishLuce(!luce)}>
            {luce ? (
              <LuceAccesa style={{ height: 150 }} />
            ) : (
              <LuceSpenta style={{ height: 150 }} />
            )}
          </Card>
          {mcuConnected ? <LightAmount brightness={brightness} /> : <></>}
        </StatusBlock>
        <ModeBlock>
          <ModeCardBlock>
            <Card
              disabled={!mcuConnected}
              onClick={() => Api.publishMode(!clap, sound)}
            >
              {clap ? (
                <ClapAcceso style={{ height: 150 }} />
              ) : (
                <ClapSpento style={{ height: 150 }} />
              )}
            </Card>
            <Card
              disabled={!mcuConnected || DNDActive}
              onClick={() => Api.publishMode(clap, !sound)}
            >
              {DNDActive ? (
                <DoNotDisturb style={{ marginLeft: 25, height: 150 }} />
              ) : sound ? (
                <SoundSpento style={{ height: 150 }} />
              ) : (
                <SoundAcceso style={{ height: 150 }} />
              )}
            </Card>
          </ModeCardBlock>
          <ChangeModeButton
            disabled={!mcuConnected}
            onClick={() => Api.publishChangeMode()}
          >
            <ChangeModeText>Change Mode!</ChangeModeText>
          </ChangeModeButton>
        </ModeBlock>
      </UpperContainer>
    </HomeContainer>
  );
};

export default Home;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 100px;
  background-color: ${Colors.lightorange};
  height: 100%;
  align-items: center;
`;

export const UpperContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;

export const Card = styled.div`
  display: flex;
  height: 300px;
  width: 250px;
  margin: 0 10px;
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
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
`;

export const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 450px;
  flex: 1;
`;

export const ModeBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 450px;
  flex: 1;
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
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
`;

export const ChangeModeText = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: ${Colors.nyanza};
`;
