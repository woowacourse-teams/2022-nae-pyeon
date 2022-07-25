import React from "react";
import TeamCreateButton from "@/components/TeamCreateButton";

export default {
  component: TeamCreateButton,
  title: "TeamCreateButton",
};

const Template = (args) => <TeamCreateButton {...args}></TeamCreateButton>;

export const Default = Template.bind({});
Default.args = {};
