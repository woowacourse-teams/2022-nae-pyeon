import React, { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "@emotion/styled";

import { UserContext } from "@/context/UserContext";
import { useSnackbar } from "@/context/SnackbarContext";

import IconButton from "@/components/IconButton";
import LineButton from "@/components/LineButton";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";
import { CustomError, ValueOf } from "@/types";
import { appClient, queryClient } from "@/api";
import Pencil from "@/assets/icons/bx-pencil.svg";

const MODE = {
  NORMAL: "normal",
  EDIT: "edit",
} as const;
interface UserProfileProp {
  username: string;
  email: string;
}

type UserProfileMode = ValueOf<typeof MODE>;

const UserProfile = ({ username, email }: UserProfileProp) => {
  const [mode, setMode] = useState<UserProfileMode>(MODE.NORMAL);
  const [editName, setEditName] = useState(username);
  const { openSnackbar } = useSnackbar();

  const { logout } = useContext(UserContext);

  const { mutate: updateUserProfile } = useMutation(
    async ({ username }: Pick<UserProfileProp, "username">) => {
      const response = await appClient.put("/members/me", { username });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["user-profile"]);
        openSnackbar("이름 수정 완료");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const customError = error.response.data as CustomError;
          alert(customError.message);
        }
      },
    }
  );

  const handleLogoutButtonClick = () => {
    if (mode === MODE.NORMAL) {
      logout();
    }
  };

  const handleEditCancelButtonClick = () => {
    if (confirm("이름 변경을 취소하시겠습니까?")) {
      setMode(MODE.NORMAL);
    }
  };

  const handleEditSaveButtonClick = () => {
    if (mode === MODE.EDIT) {
      updateUserProfile({ username: editName });
      setMode(MODE.NORMAL);
    }
  };

  return (
    <StyledProfile>
      {mode === MODE.NORMAL ? (
        <>
          <StyledNormal>
            <StyledName>{username}</StyledName>
            <IconButton
              onClick={() => {
                setMode(MODE.EDIT);
              }}
            >
              <Pencil />
            </IconButton>
          </StyledNormal>
          <StyledEmail>{email}</StyledEmail>
          <LineButton onClick={handleLogoutButtonClick}>로그아웃</LineButton>
        </>
      ) : (
        <StyledUserProfileEditForm>
          <UnderlineInput
            value={editName}
            setValue={setEditName}
            pattern={REGEX.USERNAME.source}
            errorMessage="2~20자 사이의 이름을 입력해주세요"
          />
          <StyledEditLineButtonContainer>
            <LineButton onClick={handleEditCancelButtonClick}>취소</LineButton>
            <LineButton onClick={handleEditSaveButtonClick}>완료</LineButton>
          </StyledEditLineButtonContainer>
        </StyledUserProfileEditForm>
      )}
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

const StyledUserProfileEditForm = styled.form`
  display: flex;
  flex-direction: column;

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

const StyledEditLineButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default UserProfile;
