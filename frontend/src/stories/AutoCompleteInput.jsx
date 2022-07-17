import React from "react";
import AutoCompleteInput from "@/components/AutoCompleteInput";

export default {
  component: AutoCompleteInput,
  title: "AutoCompleteInput",
};

const Template = (args) => <AutoCompleteInput {...args}></AutoCompleteInput>;

export const Default = Template.bind({});
Default.args = {
  labelText: "여기에 라벨 텍스트가 나옵니다.",
  searchKeywordList: ["A", "B", "C", "D", "AA", "AB"],
};
