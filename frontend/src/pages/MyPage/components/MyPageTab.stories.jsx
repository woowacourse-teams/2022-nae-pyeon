import React from "react";
import MyPageTab from "@/pages/MyPage/components/MyPageTab";

export default {
  component: MyPageTab,
  title: "MyPageTab",
};

const Template = (args) => <MyPageTab {...args}></MyPageTab>;

export const Disabled = Template.bind({});
Disabled.args = {
  number: 10,
  text: "받은 롤링페이퍼",
  activate: false,
};

export const Activate = Template.bind({});
Activate.args = {
  number: 10,
  text: "받은 롤링페이퍼",
  activate: true,
};
