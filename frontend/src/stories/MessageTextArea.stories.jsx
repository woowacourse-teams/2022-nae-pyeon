import React from "react";
import MessageTextArea from "@/components/MessageTextArea";

export default {
  component: MessageTextArea,
  title: "MessageTextArea",
};

const Template = (args) => <MessageTextArea {...args}></MessageTextArea>;

export const Default = Template.bind({});
Default.args = {
  value: "테스트",
  placeholder: "메시지를 입력해보세요!",
};
