import React from "react";
import SearchResultItem from "@/pages/TeamSearchPage/components/SearchResultItem";

export default {
  component: SearchResultItem,
  title: "components/TeamSearchPage/SearchResultItem",
};

const Template = (args) => <SearchResultItem {...args}></SearchResultItem>;

export const Default = Template.bind({});
Default.args = {
  children: "우테코 4기",
};
