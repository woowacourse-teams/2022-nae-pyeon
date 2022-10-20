import React from "react";
import styled from "@emotion/styled";

import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";
import StepLayout from "@/pages/RollingpaperCreationPage/components/StepLayout";

import { REGEX } from "@/constants";

import { Rollingpaper } from "@/types";

interface Step3Props {
  onChangeTitle: (title: Rollingpaper["title"]) => void;
  onSubmitRollingpaperCreate: () => void;
  title: Rollingpaper["title"] | null;
}
const Step3 = ({
  onChangeTitle,
  onSubmitRollingpaperCreate,
  title,
}: Step3Props) => {
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    onChangeTitle(value);
  };

  const handleTitleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmitRollingpaperCreate();
  };

  return (
    <StepLayout title="롤링페이퍼 제목을 작성해주세요">
      <StyledMain>
        <StyledForm>
          <LabeledInput
            pattern={REGEX.ROLLINGPAPER_TITLE.source}
            errorMessage={"1~20자 사이의 제목을 입력해주세요"}
            onChange={handleTitleChange}
            value={title ? title : ""}
          />
          <Button
            type="submit"
            onClick={handleTitleSubmit}
            disabled={!REGEX.ROLLINGPAPER_TITLE.test(title ? title : "")}
          >
            확인
          </Button>
        </StyledForm>
      </StyledMain>
    </StepLayout>
  );
};

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 12px;

  width: 250px;

  @media only screen and (min-width: 600px) {
    width: 320px;
  }
`;

export default Step3;
