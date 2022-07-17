import React, { useState } from "react";
import styled from "@emotion/styled";

import LineButton from "@/components/LineButton";
import Modal from "@/components/Modal";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";

const TeamJoinModalForm = ({
  onClickCloseButton,
}: {
  onClickCloseButton: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [username, setUsername] = useState("");

  return (
    <Modal onClickCloseButton={onClickCloseButton}>
      <StyledJoinForm>
        <p>모임에서 사용할 닉네임을 입력해주세요. (2 ~ 20자)</p>
        <UnderlineInput
          value={username}
          setValue={setUsername}
          pattern={REGEX.USERNAME.source}
          errorMessage="한글, 영어, 숫자 / 2 ~ 20자"
        />
        <LineButton>모임 가입하기</LineButton>
      </StyledJoinForm>
    </Modal>
  );
};

const StyledJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  p {
    margin: 20px 0 100px;
  }

  button {
    margin-top: 8px;
  }
`;

export default TeamJoinModalForm;
