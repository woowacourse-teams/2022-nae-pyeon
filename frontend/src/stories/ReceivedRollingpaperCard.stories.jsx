import React from "react";
import ReceivedRollingpaperCard from "@/components/ReceivedRollingpaperCard";

export default {
  component: ReceivedRollingpaperCard,
  title: "ReceivedRollingpaperCard",
};

const Template = (args) => (
  <ReceivedRollingpaperCard {...args}></ReceivedRollingpaperCard>
);

export const Default = Template.bind({});
Default.args = { title: "소피아의 생일을 축하해", teamName: "우테코 4기" };
