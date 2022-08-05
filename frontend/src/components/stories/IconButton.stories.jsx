import React from "react";
import IconButton from "@components/IconButton";

import PencilIcon from "@/assets/icons/bx-pencil.svg";

export default {
  component: IconButton,
  title: "components/common/IconButton",
};

const Template = (args) => <IconButton {...args}></IconButton>;

export const Default = Template.bind({});
Default.args = {
  children: <PencilIcon />,
};
