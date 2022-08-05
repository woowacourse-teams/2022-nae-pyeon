import React from "react";
import LineButton from "@/components/LineButton";

export default {
  component: LineButton,
  title: "components/common/LineButton",
};

const Template = (args) => <LineButton {...args}></LineButton>;

export const Default = Template.bind({});
Default.args = {
  type: "LineButton",
  children: "완료",
};
