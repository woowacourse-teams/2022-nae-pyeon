import React from "react";
import RollingpaperMessage from "@/components/RollingpaperMessage";

export default {
  component: RollingpaperMessage,
  title: "RollingpaperMessage",
};

const Template = (args) => (
  <RollingpaperMessage {...args}></RollingpaperMessage>
);

export const Default = Template.bind({});
Default.args = {
  content:
    "소피아생일축하해✨🚀소피아생일축하해✨🚀소피아생일축하해✨🚀소피아생일축하해✨🚀소피아생일축하해✨🚀소피아생일축하해✨🚀해",
  author: "도리",
};
