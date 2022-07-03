import React from "react";
import SearchInput from "@/components/SearchInput";

export default {
  component: SearchInput,
  title: "SearchInput",
};

const Template = (args) => <SearchInput {...args}></SearchInput>;

export const Default = Template.bind({});
Default.args = {
  labelText: "여기에 라벨 텍스트가 나옵니다.",
  searchKeywordList: ["A", "B", "C", "D", "AA", "AB"],
};
