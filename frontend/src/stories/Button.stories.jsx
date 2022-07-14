import React from "react";
import Button from "@/components/Button";

export default {
  component: Button,
  title: "Button",
};

const Template = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});
Default.args = {
  type: "Button",
  children: "완료",
};
