import React from "react";
import { MemoryRouter } from "react-router-dom";

import MyTeamCard from "@/pages/MainPage/components/MyTeamCard";

export default {
  component: MyTeamCard,
  title: "components/MainPage/MyTeamCard",
};

const Template = (args) => (
  <MemoryRouter>
    <MyTeamCard {...args}></MyTeamCard>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  name: "우테코 4기",
  description: "우테코 4기 설명입니다",
  emoji: "😎",
  color: "#FF8181",
};
