import React from "react";
import PageTitle from "@/components/PageTitle";

export default {
  component: PageTitle,
  title: "components/common/PageTitle",
};

const Template = (args) => <PageTitle {...args}></PageTitle>;

export const Default = Template.bind({});
Default.args = {
  children: "롤링페이퍼 만들기",
};
