import React from "react";
import { MemoryRouter } from "react-router-dom";

import TeamJoinModalForm from "@/pages/TeamDetailPage/components/TeamJoinModalForm";

export default {
  component: TeamJoinModalForm,
  title: "components/TeamDetailPage/TeamJoinModalForm",
};

const Template = (args) => (
  <MemoryRouter>
    <TeamJoinModalForm {...args}></TeamJoinModalForm>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
