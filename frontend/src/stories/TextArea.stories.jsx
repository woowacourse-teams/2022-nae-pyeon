import React from "react";
import TextArea from "@/components/TextArea";

export default {
  component: TextArea,
  title: "TextArea",
};

const Template = (args) => <TextArea {...args}></TextArea>;

export const Default = Template.bind({});
Default.args = {};
