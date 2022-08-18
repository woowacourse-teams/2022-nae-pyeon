import React from "react";
import LabeledCheckBox from "@/components/LabeledCheckBox";

export default {
  component: LabeledCheckBox,
  title: "components/common/LabeledCheckBox",
};

const Template = (args) => <LabeledCheckBox {...args}></LabeledCheckBox>;

export const Default = Template.bind({});
Default.args = {
  labeledText: "라벨 텍스트",
};
