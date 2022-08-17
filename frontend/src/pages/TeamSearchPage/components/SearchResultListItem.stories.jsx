import React from "react";
import SearchResultListItem from "@/pages/TeamSearchPage/components/SearchResultListItem";

export default {
  component: SearchResultListItem,
  title: "components/TeamSearchPage/SearchResultListItem",
};

const Template = (args) => (
  <SearchResultListItem {...args}></SearchResultListItem>
);

export const SecretItem = Template.bind({});
SecretItem.args = {
  name: "우테코 4기",
  secret: true,
};

export const PublicItem = Template.bind({});
PublicItem.args = {
  name: "우테코 4기",
  secret: false,
};
