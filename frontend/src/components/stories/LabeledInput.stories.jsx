import React from "react";
import LabeledInput from "@/components/LabeledInput";

export default {
  component: LabeledInput,
  title: "LabeledInput",
};

const Template = (args) => <LabeledInput {...args}></LabeledInput>;

export const Default = Template.bind({});
Default.args = {
  labelText: "여기에 라벨 텍스트가 나옵니다.",
};
