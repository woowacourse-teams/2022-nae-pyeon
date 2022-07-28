import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import styled from "@emotion/styled";

import Logo from "@/components/Logo";
import LabeledInput from "@/components/LabeledInput";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import SocialLoginButton from "@/components/SocialLoginButton";

import { UserContext } from "@/context/UserContext";

import appClient from "@/api";
import { CustomError } from "@/types";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const { mutate: requestLogin } = useMutation(
    () => {
      return appClient
        .post(`/login`, {
          email,
          password,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        login(data.accessToken);
        navigate(`/`, { replace: true });
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    requestLogin();
  };

  return (
    <>
      <StyledTitle>
        <Logo />
        <div>내 마음을 편지로</div>
      </StyledTitle>
      <StyledMain>
        <form onSubmit={handleLoginSubmit}>
          <LabeledInput labelText="이메일" value={email} setValue={setEmail} />
          <PasswordInput
            labelText="비밀번호"
            value={password}
            setValue={setPassword}
          />
          <StyledErrorMessage>
            {(emailError && "이메일을 입력해주세요") ||
              (passwordError && "비밀번호를 입력해주세요")}
          </StyledErrorMessage>
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

const StyledErrorMessage = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.RED_300};
`;

export default LoginPage;
