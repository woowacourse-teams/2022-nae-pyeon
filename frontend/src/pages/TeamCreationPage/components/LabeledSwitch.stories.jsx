import React from "react";
import LabeledSwitch from "@/components/LabeledSwitch";

export default {
  component: LabeledSwitch,
  title: "components/common/LabeledSwitch",
};

const Template = (args) => <LabeledSwitch {...args}></LabeledSwitch>;

export const Default = Template.bind({});
Default.args = {
  labelText: "라벨이 들어가는 곳",
};
