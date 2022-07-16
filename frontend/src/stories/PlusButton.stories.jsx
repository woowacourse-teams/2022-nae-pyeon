import React from "react";
import PlusButton from "@/components/PlusButton";

export default {
  component: PlusButton,
  title: "PlusButton",
};

const Template = (args) => <PlusButton {...args}></PlusButton>;

export const Default = Template.bind({});
Default.args = {};
