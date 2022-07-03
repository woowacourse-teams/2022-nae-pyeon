import React from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import reset from "./styles/reset";

const Style = styled.div`
  color: hotpink;
`;

const App = () => {
  return (
    <div>
      <Global styles={reset} />
      <Style>APP!!</Style>
    </div>
  );
};

export default App;
