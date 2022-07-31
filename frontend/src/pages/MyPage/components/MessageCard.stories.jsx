import React from "react";
import MessageCard from "@/pages/MyPage/components/MessageCard";

export default {
  component: MessageCard,
  title: "MessageCard",
};

const Template = (args) => <MessageCard {...args}></MessageCard>;

export const Default = Template.bind({});
Default.args = {
  rollingpaperTitle: "소피아의 생일을 축하해",
  to: "소피아",
  team: "우테코 4기",
  content: "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
  color: "#C5FF98",
};
