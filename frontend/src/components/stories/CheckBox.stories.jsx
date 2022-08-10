import React from "react";
import CheckBox from "@/components/CheckBox";

export default {
  component: CheckBox,
  title: "components/common/CheckBox",
};

const Template = (args) => <CheckBox {...args}></CheckBox>;

export const Default = Template.bind({});
Default.args = {};
