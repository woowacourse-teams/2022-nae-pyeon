import React from "react";
import SearchInput from "@/components/SearchInput";

export default {
  component: SearchInput,
  title: "components/common/SearchInput",
};

const Template = (args) => <SearchInput {...args}></SearchInput>;

export const Default = Template.bind({});
Default.args = {};
