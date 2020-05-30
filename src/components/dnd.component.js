import React, { useContext } from "react";
import { AppContext } from "../context";
import styled from "styled-components";
import Colors from "./colors";
import TimeField from "react-simple-timefield";
import { ReactComponent as DoNotDisturb } from "../assets/do-not-disturb.svg";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Api from "../services/mqtt.service";

const DND = () => {
  const {
    setDNDEnabled,
    DNDEnabled,
    setOraInizio,
    oraInizio,
    setOraFine,
    oraFine,
  } = useContext(AppContext);

  const handleToggle = (event) => {
    setDNDEnabled(event.target.checked);
    Api.publishDNDEnabled(event.target.checked);
  };

  const handleOraInizio = (event) => setOraInizio(event.target.value);
  const handleOraFine = (event) => setOraFine(event.target.value);
  return (
    <DNDContainer>
      <TimeSection>
        <TimeContainer first>
          <TimeDescription>Start time:</TimeDescription>
          <TimeField
            value={oraInizio}
            onChange={handleOraInizio}
            input={<InputText />}
          />
        </TimeContainer>
        <TimeContainer>
          <TimeDescription>End Time:</TimeDescription>
          <TimeField
            value={oraFine}
            onChange={handleOraFine}
            input={<InputText />}
          />
        </TimeContainer>
      </TimeSection>
      <ControlSection>
        <FormControlLabel
          control={
            <PurpleSwitch checked={DNDEnabled} onChange={handleToggle} />
          }
          label={<ToggleLabel>Enable DoNotDisturb</ToggleLabel>}
        />
        <IconWrapper>
          <DoNotDisturb style={{ height: 150, marginLeft: 30 }} />
        </IconWrapper>
        <SubmitButton onClick={() => Api.publishDNDTimes(oraInizio, oraFine)}>
          <SubmitText>Submit Times!</SubmitText>
        </SubmitButton>
      </ControlSection>
    </DNDContainer>
  );
};

export default DND;

export const DNDContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${Colors.lightorange};
  height: 100%;
  padding-top: 50px;
`;

export const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 470px;
`;

export const TimeContainer = styled.div`
  margin-top: ${(p) => (p.first ? "0" : "10px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TimeDescription = styled.p`
  font-size: 70px;
  font-weight: 400;
  text-align: right;
  flex: 1;
  color: ${Colors.darkpurple};
`;

export const InputText = styled.input`
  margin-left: 40px;
  width: 5ch;
  height: 2ch;
  outline: none;
  border-radius: 10px;
  font-size: 120px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.darkpurple};
  background-color: ${Colors.nyanza};
`;

export const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 470px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background-color: ${Colors.nyanza};
`;

export const ToggleLabel = styled.p`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: ${Colors.darkpurple};
`;

export const SubmitButton = styled.div`
  display: flex;
  height: 70px;
  width: 80%;
  margin-top: 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.darkpurple};
  box-shadow: ${Colors.darkpurpleshadow} 0px 8px 0px;
  cursor: pointer;
  :active {
    margin-top: 28px;
    box-shadow: ${Colors.darkpurpleshadow} 0px 0px 0px;
    transition: 0.15s;
  }
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
`;

export const SubmitText = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: ${Colors.nyanza};
`;

const PurpleSwitch = withStyles({
  root: {
    width: 90,
    height: 52,
    display: "flex",
    marginRight: 30,
  },
  thumb: {
    width: 48,
    height: 48,
  },
  switchBase: {
    padding: 1,
    color: Colors.nyanza,
    "&$checked": {
      color: Colors.darkpurple,
      transform: "translateX(40px)",
    },
    "&$checked + $track": {
      backgroundColor: Colors.darkpurple,
    },
  },
  checked: {},
  track: {
    borderRadius: 26 / 2,
    height: 26,
    width: 150,
  },
})(Switch);
