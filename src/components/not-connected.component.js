import React from "react";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';
import Colors from "./colors";

const NotConnected = () => {
  return (
    <NotConnectedContainer>
      <NotConnectedMessage>Mcu not connected</NotConnectedMessage>
      <CircularProgress />
    </NotConnectedContainer>
  );
};

export default NotConnected;

export const NotConnectedContainer = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: row;
`;
export const NotConnectedMessage = styled.div`
  font-size: 30px;
  font-weight: 300;
  color: ${Colors.darkpurple};
  margin-right: 35px;
`;
