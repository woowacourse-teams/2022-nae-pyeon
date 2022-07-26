import React, { useState, useContext } from "react";
import styled from "@emotion/styled";

import IconButton from "@/components/IconButton";

import Pencil from "@/assets/icons/bx-pencil.svg";
import LineButton from "@/components/LineButton";
import UnderlineInput from "@/components/UnderlineInput";

import { deleteCookie } from "@/util/cookie";
import { UserContext } from "@/context/UserContext";
import { REGEX } from "@/constants";

interface UserProfileProp {
  name: string;
  email: string;
}

const UserProfile = ({ name, email }: UserProfileProp) => {
  const [mode, setMode] = useState("normal");
  const [editName, setEditName] = useState(name);

  const { setIsLoggedIn } = useContext(UserContext);

  const handleButtonClick = () => {
    if (mode === "normal") {
      deleteCookie("accessToken");
      setIsLoggedIn(false);
    }
  };
  return (
    <StyledProfile>
      {mode === "normal" ? (
        <>
          <StyledNormal>
            <StyledName>{name}</StyledName>
            <IconButton
              onClick={() => {
                setMode("edit");
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
        {mode === "normal" ? "로그아웃" : "완료"}
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
