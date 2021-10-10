import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

const UnauthenticatedApp = () => {

  const [isRegister, setIsRegister] = useState(false);
  const [ error, setError] = useState<Error | null>(null)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
          <Tittle>
              {isRegister ? "Log in Please" : "Register Please"}
          </Tittle>
          { error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
        {isRegister ? <LoginScreen onError={setError} /> : <RegisterScreen onError={setError} />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Don't have account? Register Here"
            : "Have a account already? Log in"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Tittle = styled.h3`
margin-bottom: 2.4rem;
color: rgb(94, 108, 132)
`

const ShadowCard = styled(Card)`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 0;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw -40rem) / 2) - 3.2rem),
    calc(((100vw -40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

export default UnauthenticatedApp;
