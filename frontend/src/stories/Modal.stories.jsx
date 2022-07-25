import React from "react";
import Modal from "@/components/Modal";

export default {
  component: Modal,
  title: "Modal",
};

const Template = (args) => <Modal {...args}></Modal>;

export const Default = Template.bind({});
Default.args = {
  children: "롤링페이퍼 만들기",
};
