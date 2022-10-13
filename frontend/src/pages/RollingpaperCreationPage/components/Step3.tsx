import React, { forwardRef } from "react";
import styled from "@emotion/styled";

import useInput from "@/hooks/useInput";

import Button from "@/components/Button";
import LabeledInput from "@/components/LabeledInput";

import StepTitleWithLayout from "@/pages/RollingpaperCreationPage/components/StepTitleWithLayout";

import { Rollingpaper } from "@/types";
import { REGEX } from "@/constants";

interface Step3Props {
  onClick: (title: Rollingpaper["title"]) => void;
}
const Step3 = ({ onClick }: Step3Props, ref: React.Ref<HTMLDivElement>) => {
  const { value: title, handleInputChange } = useInput("");

  const handleTitleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(title);
  };

  return (
    <StepTitleWithLayout title="롤링페이퍼 제목을 작성해주세요" ref={ref}>
      <StyledMain>
        <StyledForm>
          <LabeledInput
            pattern={REGEX.ROLLINGPAPER_TITLE.source}
            errorMessage={"1~20자 사이의 제목을 입력해주세요"}
            value={title}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            onClick={handleTitleSubmit}
            disabled={!REGEX.ROLLINGPAPER_TITLE.test(title)}
          >
            확인
          </Button>
        </StyledForm>
      </StyledMain>
    </StepTitleWithLayout>
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

  width: 200px;

  @media only screen and (min-width: 600px) {
    width: 320px;
  }
`;

export default forwardRef(Step3);
