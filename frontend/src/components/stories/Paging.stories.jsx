import React from "react";
import Paging from "@/components/Paging";

export default {
  component: Paging,
  title: "components/common/Paging",
};

const Template = (args) => <Paging {...args}></Paging>;

export const Default = Template.bind({});
Default.args = { currentPage: 3, maxPage: 10 };
