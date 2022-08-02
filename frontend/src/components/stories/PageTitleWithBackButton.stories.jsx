import React from "react";
import { MemoryRouter } from "react-router-dom";

import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

export default {
  component: PageTitleWithBackButton,
  title: "components/common/PageTitleWithBackButton",
};

const Template = (args) => (
  <MemoryRouter>
    <PageTitleWithBackButton {...args}></PageTitleWithBackButton>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  children: "모임 추가하기",
};
