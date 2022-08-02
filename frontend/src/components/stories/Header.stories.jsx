import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "@/components/Header";

export default {
  component: Header,
  title: "components/common/Header",
};

const Template = (args) => (
  <BrowserRouter>
    <Header {...args}></Header>
  </BrowserRouter>
);
export const Default = Template.bind({});
Default.args = {};
