import React from "react";
import MyTeamCard from "@/pages/MainPage/components/MyTeamCard";

export default {
  component: MyTeamCard,
  title: "MyTeamCard",
};

const Template = (args) => <MyTeamCard {...args}></MyTeamCard>;

export const Default = Template.bind({});
Default.args = {
  name: "우테코 4기",
  description: "우테코 4기 설명입니다",
  emoji: "😎",
  color: "#FF8181",
};
