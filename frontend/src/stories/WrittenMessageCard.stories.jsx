import React from "react";
import WrittenMessageCard from "@/components/WrittenMessageCard";

export default {
  component: WrittenMessageCard,
  title: "WrittenMessageCard",
};

const Template = (args) => <WrittenMessageCard {...args}></WrittenMessageCard>;

export const Default = Template.bind({});
Default.args = {
  rollingpaperTitle: "소피아의 생일을 축하해",
  to: "소피아",
  team: "우테코 4기",
  content: "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
  color: "#C5FF98",
};
