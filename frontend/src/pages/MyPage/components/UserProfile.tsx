import { useState, useContext } from "react";
import styled from "@emotion/styled";

import { UserContext } from "@/context/UserContext";

import useInput from "@/hooks/useInput";
import useUpdateUserProfile from "@/hooks/api/member/useUpdateUserProfile";

import LineButton from "@/components/LineButton";
import UnderlineInput from "@/components/UnderlineInput";

import { REGEX } from "@/constants";
import { ValueOf } from "@/types";

const MODE = {
  NORMAL: "normal",
  EDIT: "edit",
} as const;

interface UserProfileProps {
  username: string;
  email: string;
}

type UserProfileMode = ValueOf<typeof MODE>;

const UserProfile = ({ username, email }: UserProfileProps) => {
  const [mode, setMode] = useState<UserProfileMode>(MODE.NORMAL);
  const { value: editName, handleInputChange: handleEditNameChange } =
    useInput(username);

  const { mutate: updateUserProfile } = useUpdateUserProfile();

  const { logout } = useContext(UserContext);

  const handleLogoutButtonClick = () => {
    if (mode === MODE.NORMAL) {
      logout();
    }
  };

  const handleEditCancelButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (confirm("이름 변경을 취소하시겠습니까?")) {
      setMode(MODE.NORMAL);
    }
  };

  const handleUserProfileEditFormSubmit: React.FormEventHandler<
    HTMLFormElement
  > = () => {
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
            <StyledEmail>{email}</StyledEmail>
            <StyledEditLineButtonContainer>
              <LineButton
                onClick={() => {
                  setMode(MODE.EDIT);
                }}
              >
                이름 수정하기
              </LineButton>
              <LineButton onClick={handleLogoutButtonClick}>
                로그아웃
              </LineButton>
            </StyledEditLineButtonContainer>
          </StyledNormal>
        </>
      ) : (
        <>
          <StyledUserProfileEditForm onSubmit={handleUserProfileEditFormSubmit}>
            <UnderlineInput
              value={editName}
              pattern={REGEX.USERNAME.source}
              errorMessage="1 ~ 64자 사이의 이름을 입력해주세요"
              onChange={handleEditNameChange}
            />
            <StyledEditLineButtonContainer>
              <LineButton onClick={handleEditCancelButtonClick}>
                취소
              </LineButton>
              <LineButton type="submit">완료</LineButton>
            </StyledEditLineButtonContainer>
          </StyledUserProfileEditForm>
        </>
      )}
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  margin: 24px 10px;
`;

const StyledNormal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 12px;
`;

const StyledUserProfileEditForm = styled.form`
  display: flex;
  flex-direction: column;

  font-size: 14px;

  input {
    font-size: 24px;
  }

  @media only screen and (min-width: 600px) {
    input {
      width: 70%;
    }
  }

  @media only screen and (min-width: 960px) {
    input {
      width: 50%;
    }
  }
`;

const StyledName = styled.div`
  font-weight: 600;
  font-size: 24px;
`;

const StyledEmail = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const StyledEditLineButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default UserProfile;
