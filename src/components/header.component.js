import React from "react";
import NotConnected from "./not-connected.component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Colors from "./colors";

const Header = ({ mcuConnected }) => {
  return (
    <HeaderContainer>
      <HeaderTitleBox>
        <HeaderTitle>Clap To Turn The Light Up!</HeaderTitle>
        {!mcuConnected ? <NotConnected /> : <></>}
      </HeaderTitleBox>
      <HeaderMenu>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/donotdisturb">Do Not Disturb</HeaderLink>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Header;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.nyanza};
  padding: 0 3%;
`;

export const HeaderTitleBox = styled.div`
  font-weight: bold;
  color: ${Colors.darkpurple};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

export const HeaderTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${Colors.darkpurple};
`;

export const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderLink = styled(Link)`
  height: 100px;
  padding: 0 20px;
  margin: 0 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
  color: ${Colors.darkpurple};
  font-weight: bold;
  font-size: 25px;
  :hover {
    background: ${Colors.grullo};
    transition: 1s;
  }
`;
