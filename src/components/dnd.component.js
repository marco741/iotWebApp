import React from "react";
import styled from "styled-components";
import Colors from "./colors";

const DND = () => {
  return <DNDContainer>Dungeons and Dragons</DNDContainer>;
};

export default DND;

export const DNDContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 100px 100px 100px;
  background-color: ${Colors.lightorange};
  height: 100%;
`;
