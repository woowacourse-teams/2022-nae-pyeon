import React from "react";
import RollingpaperMessage from "@/pages/RollingpaperPage/components/RollingpaperMessage";

export default {
  component: RollingpaperMessage,
  title: "components/RollingpaperPage/RollingpaperMessage",
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
