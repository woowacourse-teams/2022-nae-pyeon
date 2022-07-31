import React from "react";
import RollingpaperListItem from "@/pages/TeamDetailPage/components/RollingpaperListItem";

export default {
  component: RollingpaperListItem,
  title: "RollingpaperListItem",
};

const Template = (args) => (
  <RollingpaperListItem {...args}></RollingpaperListItem>
);

export const Default = Template.bind({});
Default.args = {
  title: "우테코 고마워",
  to: "우테코",
};
