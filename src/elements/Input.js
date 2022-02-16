import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, width } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <EleTextArea
          type={type}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <EleInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          width={width}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요",
  _onChange: () => {},
  type: "text",
  multiLine: false,
  value: "",
  width: "100%",
  margin: "20px",
};

const EleInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  margin: 10px;
`;

const EleTextArea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
