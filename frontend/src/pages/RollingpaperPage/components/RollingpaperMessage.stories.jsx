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
    "이국 위에도 것은 애기 별 헤일 된 봅니다. 같이 보고, 없이 언덕 된 하나의 하나에 까닭입니다.",
  author: "도리",
  color: "#FFF598",
};
