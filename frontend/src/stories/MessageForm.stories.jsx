import React from "react";
import MessageForm from "@/components/MessageForm";

export default {
  component: MessageForm,
  title: "MessageForm",
};

const Template = (args) => <MessageForm {...args}></MessageForm>;

export const Default = Template.bind({});
Default.args = {};