import React from "react";
import TeamCreateButton from "@/pages/MainPage/components/TeamCreateButton";

export default {
  component: TeamCreateButton,
  title: "TeamCreateButton",
};

const Template = (args) => <TeamCreateButton {...args}></TeamCreateButton>;

export const Default = Template.bind({});
Default.args = {};
