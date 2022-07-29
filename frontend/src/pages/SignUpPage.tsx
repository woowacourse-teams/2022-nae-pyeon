import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import styled from "@emotion/styled";

import appClient from "@/api";

import PageTitle from "@/components/PageTitle";
import LabeledInput from "@/components/LabeledInput";
import Button from "@/components/Button";

import { REGEX } from "@/constants";
import { CustomError } from "@/types";
import { useSnackbar } from "@/context/SnackbarContext";

type SignUpMemberInfo = {
  email: string;
  username: string;
  password: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: createMember } = useMutation(
    ({ username, email, password }: SignUpMemberInfo) => {
      return appClient
        .post(`/members`, {
          username,
          email,
          password,
        })
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        openSnackbar("회원가입 성공!");
        navigate("/login");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleSignupClick: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!REGEX.EMAIL.test(email)) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }

    if (!REGEX.USERNAME.test(username)) {
      alert("이름은 한글, 영어, 숫자만 가능합니다.");
      return;
    }

    if (!REGEX.PASSWORD.test(password)) {
      alert("비밀번호는 최소 하나 이상의 알파벳과 숫자로 구성해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    createMember({ email, username, password });
  };

  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <StyledForm onSubmit={handleSignupClick}>
        <LabeledInput
          labelText="이메일"
          value={email}
          setValue={setEmail}
          placeholder="woowa@gmail.com"
          pattern={REGEX.EMAIL.source}
          errorMessage="이메일 형식으로 입력해주세요."
        />
        <LabeledInput
          labelText="이름"
          value={username}
          setValue={setUsername}
          placeholder="2 ~ 20자 사이의 이름을 입력해주세요."
          pattern={REGEX.USERNAME.source}
          errorMessage="한글, 영어, 숫자 / 2 ~ 20자"
        />
        <LabeledInput
          labelText="비밀번호"
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="영어, 숫자 조합의 8 ~ 20자"
          pattern={REGEX.PASSWORD.source}
          errorMessage="영어, 숫자 조합의 8 ~ 20자"
        />
        <LabeledInput
          labelText="비밀번호 확인"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          pattern={password}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <Button type="submit">확인</Button>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default SignUpPage;
