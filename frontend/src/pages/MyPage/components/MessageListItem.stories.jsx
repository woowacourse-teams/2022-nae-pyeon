import React from "react";
import MessageListItem from "@/pages/MyPage/components/MessageListItem";

export default {
  component: MessageListItem,
  title: "components/MyPage/MessageListItem",
};

const Template = (args) => <MessageListItem {...args}></MessageListItem>;

export const Default = Template.bind({});
Default.args = {
  rollingpaperTitle: "소피아의 생일을 축하해",
  to: "소피아",
  team: "우테코 4기",
  content: "소피아야 생일 축하해~ 축카추카추 소피아야 생일 축하해~ 축카추카추",
  color: "#C5FF98",
};
