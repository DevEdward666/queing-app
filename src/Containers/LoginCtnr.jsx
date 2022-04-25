import { useTheme } from "@material-ui/core";
import React from "react";
import LoginForm from "../dashcomponents/Login";
import SlideShow from "../components/SlideShow";
import { LoginStyles } from "../components/styles";

const LoginCtnr = () => {
  const theme = useTheme();
  return (
    <LoginStyles theme={theme}>
      <SlideShow />
      <LoginForm />
    </LoginStyles>
  );
};

export default LoginCtnr;
