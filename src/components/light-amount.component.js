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

export default function LightAmount({ brightness }) {

  return (
    <LightAmountContainer>
      <BorderLinearProgress
        variant="determinate"
        value={brightness}
      />
      <LightAmoutTitle>Brightness detected</LightAmoutTitle>
    </LightAmountContainer>
  );
}

export const LightAmountContainer = styled.div`
  width: 50%;
  min-width: 400px;
  margin-top: 50px;
`;

export const LightAmoutTitle = styled.p`
  font-size: 25px;
  font-weight: 500;
  color: ${Colors.darkpurple};
  margin: 20px auto 0 auto;
  text-align: center;
`;
