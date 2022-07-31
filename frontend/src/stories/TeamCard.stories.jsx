import React from "react";
import TeamCard from "@/pages/TeamSearchPage/components/TeamCard";

export default {
  component: TeamCard,
  title: "TeamCard",
};

const Template = (args) => <TeamCard {...args}></TeamCard>;

export const Default = Template.bind({});
Default.args = {
  children: "우테코 4기",
};
