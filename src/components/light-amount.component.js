import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";
import Colors from "./colors";

const BorderLinearProgress = withStyles({
  root: {
    height: 15,
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

export default function LightAmount() {
  return (
    <LightAmountContainer>
      <BorderLinearProgress variant="determinate" value={50} />
      <LightAmoutTitle>Brightness detected</LightAmoutTitle>
    </LightAmountContainer>
  );
}

export const LightAmountContainer = styled.div`
  width: 50%;
`;

export const LightAmoutTitle = styled.p`
  font-size: 25px;
  font-weight: 500;
  color: ${Colors.darkpurple};
  margin: 20px auto 0 auto;
  text-align: center;
`;
