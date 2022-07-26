import React from "react";
import UserProfile from "@/components/UserProfile";

export default {
  component: UserProfile,
  title: "UserProfile",
};

const Template = (args) => <UserProfile {...args}></UserProfile>;

export const Default = Template.bind({});
Default.args = {
  name: "도리",
  email: "sunho620@naver.com",
};
