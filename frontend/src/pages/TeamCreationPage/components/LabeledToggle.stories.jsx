import React from "react";
import LabeledToggle from "@/components/LabeledToggle";

export default {
  component: LabeledToggle,
  title: "components/common/LabeledToggle",
};

const Template = (args) => <LabeledToggle {...args}></LabeledToggle>;

export const Default = Template.bind({});
Default.args = {
  labelText: "라벨이 들어가는 곳",
};
