import React from "react";
import MainCard from "@/components/MainCard";

export default {
  component: MainCard,
  title: "MainCard",
};

const Template = (args) => <MainCard {...args}></MainCard>;

export const Default = Template.bind({});
Default.args = {
  name: "우테코 4기",
  description: "우테코 4기 설명입니다",
  emoji: "😎",
  color: "#FF8181",
};
