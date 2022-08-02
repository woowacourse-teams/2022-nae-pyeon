import React from "react";
import Dropdown from "@/components/Dropdown";

export default {
  component: Dropdown,
  title: "Dropdown",
};

const Template = (args) => <Dropdown {...args}></Dropdown>;

const teamOption = [
  {
    option: "초대하기",
    callback: () => {
      console.log("초대하기");
    },
  },
  {
    option: "모임 프로필 설정",
    callback: () => {
      console.log("모임 프로필 설정");
    },
  },
];

export const Default = Template.bind({});
Default.args = {
  optionList: teamOption,
};
