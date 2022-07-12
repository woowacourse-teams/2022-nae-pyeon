import React from "react";
import IconButton from "@components/IconButton";
import { BiPencil } from "react-icons/bi";

export default {
  component: IconButton,
  title: "IconButton",
};

const Template = (args) => <IconButton {...args}></IconButton>;

export const Default = Template.bind({});
Default.args = {
  children: <BiPencil />,
};
