import React from "react";
import PageTitle from "@/components/PageTitle";

export default {
  component: PageTitle,
  title: "PageTitle",
};

const Template = (args) => <PageTitle {...args}></PageTitle>;

export const Default = Template.bind({});
Default.args = {
  type: "PageTitle",
  children: "롤링페이퍼 만들기",
};
