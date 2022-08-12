import React from "react";
import SecretMessage from "@/pages/RollingpaperPage/components/SecretMessage";

export default {
  component: SecretMessage,
  title: "components/RollingpaperPage/SecretMessage",
};

const Template = (args) => <SecretMessage {...args}></SecretMessage>;

export const Default = Template.bind({});
Default.args = {};
