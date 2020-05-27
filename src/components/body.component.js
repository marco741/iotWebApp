import React from "react";
import { Switch, Route } from "react-router-dom";
import DND from "./dnd.component";
import Home from "./home.component";
import styled from "styled-components";

const Body = () => {
  return (
    <BodyContainer>
      <Switch>
        <Route path="/donotdisturb">
          <DND />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BodyContainer>
  );
};

export default Body;

export const BodyContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
