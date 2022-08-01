import React from "react";
import MoreDropdown from "@/components/MoreDropdown";

export default {
  component: MoreDropdown,
  title: "MoreDropdown",
};

const Template = (args) => <MoreDropdown {...args}></MoreDropdown>;

const teamMoreOption = [
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
  optionList: teamMoreOption,
};
