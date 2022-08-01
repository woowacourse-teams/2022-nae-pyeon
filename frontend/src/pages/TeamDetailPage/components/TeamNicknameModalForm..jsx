import React from "react";
import TeamNicknameModalForm from "@/pages/TeamDetailPage/components/TeamNicknameModalForm";

export default {
  component: TeamNicknameModalForm,
  title: "TeamNicknameModalForm",
};

const Template = (args) => (
  <TeamNicknameModalForm {...args}></TeamNicknameModalForm>
);

export const Default = Template.bind({});
Default.args = {};
