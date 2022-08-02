import React from "react";
import { MemoryRouter } from "react-router-dom";

import TeamCreateButton from "@/pages/MainPage/components/TeamCreateButton";

export default {
  component: TeamCreateButton,
  title: "components/MainPage/TeamCreateButton",
};

const Template = (args) => (
  <MemoryRouter>
    <TeamCreateButton {...args}></TeamCreateButton>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
