import React from "react";
import SocialLoginButton from "@/pages/LoginPage/components/SocialLoginButton";

export default {
  component: SocialLoginButton,
  title: "SocialLoginButton",
};

const Template = (args) => <SocialLoginButton {...args}></SocialLoginButton>;

export const Default = Template.bind({});
Default.args = {};
