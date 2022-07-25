import React from "react";
import PageTitleWithBackButton from "@/components/PageTitleWithBackButton";

export default {
  component: PageTitleWithBackButton,
  title: "PageTitleWithBackButton",
};

const Template = (args) => (
  <PageTitleWithBackButton {...args}></PageTitleWithBackButton>
);

export const Default = Template.bind({});
Default.args = {
  children: "모임 추가하기",
};
