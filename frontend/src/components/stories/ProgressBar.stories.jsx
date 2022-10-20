import React from "react";

import ProgressBar from "@/components/ProgressBar";

export default {
  component: ProgressBar,
  title: "components/common/ProgressBar",
};

const Template = (args) => <ProgressBar {...args}></ProgressBar>;

export const OneThird = Template.bind({});
OneThird.args = {
  step: 1,
  total: 3,
};

export const TwoThird = Template.bind({});
TwoThird.args = {
  step: 2,
  total: 3,
};

export const FiveSixth = Template.bind({});
FiveSixth.args = {
  step: 2.5,
  total: 3,
};

export const Complete = Template.bind({});
Complete.args = {
  step: 3,
  total: 3,
};
