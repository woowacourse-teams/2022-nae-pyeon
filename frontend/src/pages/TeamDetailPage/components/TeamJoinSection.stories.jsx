import React from "react";
import TeamJoinSection from "@/pages/TeamDetailPage/components/TeamJoinSection";

export default {
  component: TeamJoinSection,
  title: "components/TeamDetailPage/TeamJoinSection",
};

const Template = (args) => {
  return <TeamJoinSection />;
};

export const Default = Template.bind({});
Default.args = {};
