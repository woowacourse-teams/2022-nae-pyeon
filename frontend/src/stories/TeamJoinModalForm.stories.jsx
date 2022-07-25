import React from "react";
import TeamJoinModalForm from "@/components/TeamJoinModalForm";

export default {
  component: TeamJoinModalForm,
  title: "TeamJoinModalForm",
};

const Template = (args) => <TeamJoinModalForm {...args}></TeamJoinModalForm>;

export const Default = Template.bind({});
Default.args = {};
