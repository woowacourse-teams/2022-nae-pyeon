import React from "react";
import MessageBox from "@/pages/RollingpaperPage/components/MessageBox";

export default {
  component: MessageBox,
  title: "components/RollingpaperPage/MessageBox",
};

const Template = (args) => <MessageBox {...args}></MessageBox>;

export const Default = Template.bind({});
Default.args = {
  content:
    "이국 위에도 것은 애기 별 헤일 된 봅니다. 같이 보고, 없이 언덕 된 하나의 하나에 까닭입니다.",
  author: "도리",
  color: "#FFF598",
};
