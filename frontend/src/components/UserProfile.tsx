import React, { useState, useContext } from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import Pencil from "@/assets/icons/bx-pencil.svg";
import LineButton from "@/components/LineButton";
import UnderlineInput from "@/components/UnderlineInput";

import { UserContext } from "@/context/UserContext";
import { REGEX } from "@/constants";
import { ValueOf } from "@/types";

const MODE = {
  NORMAL: "normal",
  EDIT: "edit",
} as const;
interface UserProfileProp {
  name: string;
  email: string;
}

type UserProfileMode = ValueOf<typeof MODE>;

const UserProfile = ({ name, email }: UserProfileProp) => {
  const [mode, setMode] = useState<UserProfileMode>(MODE.NORMAL);
  const [editName, setEditName] = useState(name);

  const { logout } = useContext(UserContext);

  const handleButtonClick = () => {
    if (mode === MODE.NORMAL) {
      logout();
    }
  };

  return (
    <StyledProfile>
      {mode === MODE.NORMAL ? (
        <>
          <StyledNormal>
            <StyledName>{name}</StyledName>
            <IconButton
              onClick={() => {
                setMode(MODE.EDIT);
              }}
            >
              <Pencil />
            </IconButton>
          </StyledNormal>
          <StyledEmail>{email}</StyledEmail>
        </>
      ) : (
        <StyledEdit>
          <UnderlineInput
            value={editName}
            setValue={setEditName}
            pattern={REGEX.USERNAME.source}
            errorMessage="2~20자 사이의 이름을 입력해주세요"
          />
        </StyledEdit>
      )}
      <LineButton onClick={handleButtonClick}>
        {mode === MODE.NORMAL ? "로그아웃" : "완료"}
      </LineButton>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  margin: 10px 0 40px 10px;
`;

const StyledNormal = styled.div`
  display: flex;
  justify-content: space-between;

  width: 160px;

  svg {
    font-size: 20px;
  }
`;

const StyledEdit = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 14px;

  input {
    width: 160px;
    font-size: 24px;
  }
`;

const StyledName = styled.div`
  font-weight: 600;
  font-size: 24px;
`;

const StyledEmail = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_700};
  margin-bottom: 12px;
`;

export default UserProfile;
