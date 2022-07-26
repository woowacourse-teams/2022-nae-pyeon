import React from "react";
import CounterWithText from "@/components/CounterWithText";

export default {
  component: CounterWithText,
  title: "CounterWithText",
};

const Template = (args) => <CounterWithText {...args}></CounterWithText>;

export const Disabled = Template.bind({});
Disabled.args = {
  number: 10,
  text: "받은 롤링페이퍼",
  activate: false,
};

export const Activate = Template.bind({});
Activate.args = {
  number: 10,
  text: "받은 롤링페이퍼",
  activate: true,
};
