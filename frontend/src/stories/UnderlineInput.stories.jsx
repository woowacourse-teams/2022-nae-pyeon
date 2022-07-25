import React from "react";
import UnderlineInput from "@/components/UnderlineInput";

export default {
  component: UnderlineInput,
  title: "UnderlineInput",
};

const Template = (args) => <UnderlineInput {...args}></UnderlineInput>;

export const Default = Template.bind({});
Default.args = {};
