import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    backgroundcolor,
    children,
    center,
    border,
    _onClick,
    borderradius,
    justifyCenter,
  } = props;

  const styles = {
    is_flex: is_flex,

    width: width,
    margin: margin,
    padding: padding,
    backgroundcolor: backgroundcolor,
    center: center,
    border: border,
    borderradius: borderradius,
    justifyCenter: justifyCenter,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_flex_center: false,
  width: "100%",
  padding: false,
  margin: false,
  backgroundcolor: false,
  center: false,
  border: false,
  _onClick: () => {},
  borderradius: false,
  justifyCenter: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  border: ${(props) => props.border};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) =>
    props.backgroundcolor ? `background-color: ${props.backgroundcolor};` : ""}
    ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
    ${(props) => (props.center ? `text-align: center` : "")};
  ${(props) =>
    props.borderradius ? `border-radius: ${props.borderradius}` : ""}
  ${(props) =>
    props.justifyCenter
      ? `display: flex; align-items: center  justify-content: space-around`
      : ""}
`;

export default Grid;
