import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header.component";
import Body from "./components/body.component";
import styled from "styled-components";

function App() {
  return (
    <>
      <Router>
          <AppContainer>
            <Header />
            <Body />
          </AppContainer>
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
