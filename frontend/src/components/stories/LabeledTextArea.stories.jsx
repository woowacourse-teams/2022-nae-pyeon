import React from "react";
import LabeledTextArea from "@/components/LabeledTextArea";

export default {
  component: LabeledTextArea,
  title: "components/common/LabeledTextArea",
};

const Template = (args) => <LabeledTextArea {...args}></LabeledTextArea>;

export const Default = Template.bind({});
Default.args = {
  labelText: "라벨 텍스트가 나오는 곳입니다",
};
