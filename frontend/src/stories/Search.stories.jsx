import React from "react";
import Search from "@/components/Search";

export default {
  component: Search,
  title: "Search",
};

const Template = (args) => <Search {...args}></Search>;

export const Default = Template.bind({});
Default.args = {};
