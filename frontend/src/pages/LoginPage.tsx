import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import LabeledInput from "@/components/LabeledInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import SocialLoginButton from "@/components/SocialLoginButton";
import logo from "@/assets/images/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <StyledTitle>
        <StyledLogo>
          <img src={logo} />
          <h1>내 편</h1>
        </StyledLogo>
        <div>내 마음을 편지로</div>
      </StyledTitle>
      <StyledMain>
        <form>
          <LabeledInput labelText="이메일" value={email} setValue={setEmail} />
          <PasswordInput value={password} setValue={setPassword} />
          <Button type="submit">로그인</Button>
        </form>
        <hr />
        <SocialLoginButton />
        <StyledGuideText>
          아직 내편의 회원이 아닌가요? <Link to="/signup">회원가입</Link>
        </StyledGuideText>
      </StyledMain>
    </>
  );
};

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15% 0;

  align-items: center;

  color: ${({ theme }) => theme.colors.SKY_BLUE_300};
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 56px;
    height: 60px;
    margin-right: 10px;
  }

  h1 {
    font-size: 56px;
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;

    button {
      margin-top: 24px;
    }
  }

  hr {
    width: 100%;
    margin: 40px 0;

    background-color: ${({ theme }) => theme.colors.GRAY_300};
    height: 2px;
    border: none;
  }
`;

const StyledGuideText = styled.div`
  margin: 20px 0;

  a {
    color: ${({ theme }) => theme.colors.SKY_BLUE_300};

    &:hover {
      color: ${({ theme }) => theme.colors.SKY_BLUE_400};
    }
  }
`;
export default LoginPage;
