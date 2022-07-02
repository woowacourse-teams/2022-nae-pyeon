import React from "react";

import Header from "@/components/Header";
import IconButton from "@/components/IconButton";
import PageTitle from "@/components/PageTitle";

import { BiChevronLeft } from "react-icons/bi";

export default {
  component: Header,
  title: "Header",
};

const Template = (args) => <Header {...args}></Header>;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <IconButton>
        <BiChevronLeft />
      </IconButton>
      <PageTitle>페이지 이름</PageTitle>
    </>
  ),
};
